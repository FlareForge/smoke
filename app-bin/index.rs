use neon::prelude::*;

mod mapper;

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("mapperStart", mapper::start_task)?;
    cx.export_function("mapperStop", mapper::stop_task)?;
    cx.export_function("mapperLoadMapping", mapper::load_mapping)?;
    cx.export_function("detectInput", mapper::detect_input)?;
    return Ok(());
}
