use neon::prelude::*;
use std::sync::Mutex;
use std::thread;
use std::collections::HashMap;
use lazy_static::lazy_static;
use gilrs::{Gilrs, Event, EventType};
use enigo::*;

#[derive(PartialEq, Eq, Clone)]
enum CharOrString {
    Char(char),
    Str(String),
}

struct Mapper {
    handler: Option<thread::JoinHandle<()>>,
    mapping: HashMap<String, CharOrString>,
}

impl Mapper {

    pub fn new() -> Mapper {
        Mapper {
            handler: None,
            mapping: HashMap::new(),
        }
    }

    pub fn load_mapping(&mut self, mut cx: FunctionContext) {
        let mapping: Handle<JsString> = cx.argument(0).unwrap();
        let mapping_string = mapping.value(&mut cx);
        let lines = mapping_string.split("\n");
        for line in lines {
            let line = line.split(" ");
            let mut line = line.map(|x| x.to_string());
            let key = line.next().unwrap();
            let value = line.next().unwrap();
            match value.len() {
                1 => {
                    let value = value.chars().next().unwrap();
                    self.mapping.insert(key, CharOrString::Char(value));
                },
                _ => {
                    self.mapping.insert(key, CharOrString::Str(value));
                }
            }
        }
    }

    pub fn stop_task(&mut self) {
        self.handler.take().unwrap().join().unwrap();
        self.handler = None;
    }

    pub fn start_task(&mut self) {

        let _mapping = self.mapping.clone();
    
        let thread_handler = thread::spawn(move || {
            let mut gilrs = Gilrs::new().unwrap();
            let mut virtual_input = Enigo::new();

            fn handle_action<T: ToString>(up: bool, key: T, virtual_input: &mut Enigo, _mapping: &HashMap<String, CharOrString>) {
                let string_key = key.to_string();
                let mapped_key = _mapping.get(&string_key);
                if mapped_key.is_none() { return; }
                let mapped_key = mapped_key.unwrap();
                match mapped_key {
                    CharOrString::Char(mapped_key) => {
                        if up { virtual_input.key_up(Key::Layout(*mapped_key)); }
                        else { virtual_input.key_down(Key::Layout(*mapped_key)); }
                    },
                    CharOrString::Str(mapped_key) => {
                        match mapped_key.as_str() {
                            "MouseLeft" => {
                                if up { virtual_input.mouse_up(MouseButton::Left); }
                                else { virtual_input.mouse_down(MouseButton::Left); }
                            },
                            "MouseRight" => {
                                if up { virtual_input.mouse_up(MouseButton::Right); }
                                else { virtual_input.mouse_down(MouseButton::Right); }
                            },
                            "MouseMiddle" => {
                                if up { virtual_input.mouse_up(MouseButton::Middle); }
                                else { virtual_input.mouse_down(MouseButton::Middle); }
                            },
                            "MouseScrollUp" => {
                                if up { virtual_input.mouse_up(MouseButton::ScrollUp); }
                                else { virtual_input.mouse_down(MouseButton::ScrollUp); }
                            },
                            "MouseScrollDown" => {
                                if up { virtual_input.mouse_up(MouseButton::ScrollDown); }
                                else { virtual_input.mouse_down(MouseButton::ScrollDown); }
                            },
                            _ => {}
                        }
                    },
                }
            }

            loop {
                while let Some(Event { id: _, event, time: _ }) = gilrs.next_event() {

                    match event {
                        EventType::ButtonPressed(_, x) => handle_action(false, x.into_u32(), &mut virtual_input, &_mapping),
                        EventType::ButtonReleased(_, x) => handle_action(true, x.into_u32(), &mut virtual_input, &_mapping),
                        EventType::AxisChanged(_, axis_value , axis) if axis_value > 0.0  => {
                            let key_positive = "AxisP".to_string()+&axis.into_u32().to_string();
                            let key_negative = "AxisN".to_string()+&axis.into_u32().to_string();   
                            handle_action(false, key_positive, &mut virtual_input, &_mapping);
                            handle_action(true, key_negative, &mut virtual_input, &_mapping);
                        },
                        EventType::AxisChanged(_, axis_value , axis) if axis_value < 0.0  => {
                            let key_positive = "AxisP".to_string()+&axis.into_u32().to_string();
                            let key_negative = "AxisN".to_string()+&axis.into_u32().to_string();   
                            handle_action(true, key_positive, &mut virtual_input, &_mapping);
                            handle_action(false, key_negative, &mut virtual_input, &_mapping);
                        },
                        EventType::AxisChanged(_, _ , axis) => {
                            let key_positive = "AxisP".to_string()+&axis.into_u32().to_string();
                            let key_negative = "AxisN".to_string()+&axis.into_u32().to_string();   
                            handle_action(true, key_positive, &mut virtual_input, &_mapping);
                            handle_action(true, key_negative, &mut virtual_input, &_mapping);
                        },
                        _ => {}
                    }
                }
            }
        });

        self.handler = Some(thread_handler);
    }
}

lazy_static! {
    static ref MAPPER: Mutex<Mapper> = Mutex::new(Mapper::new());
}

pub fn start_task(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let result = cx.undefined();
    MAPPER.lock().unwrap().start_task();
    return Result::Ok(result);
}

pub fn stop_task(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    MAPPER.lock().unwrap().stop_task();
    return Result::Ok(cx.undefined());
}

pub fn load_mapping(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let result = cx.undefined();
    MAPPER.lock().unwrap().load_mapping(cx);
    return Result::Ok(result);
}