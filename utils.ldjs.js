// Has to be Commonjs export style (modules.export not export keyword)

const geo = (c) => (params) => c.comp("geometry", {
        ...params,
        externaltox: c.sp("toxes/visuals/geo.tox"),
    });

const render = (c) => (geos, cam, lights) =>
    c.top("render", {
        geometry: c.compp(geos),
        camera: c.compp(cam || c.comp("camera")),
        lights: c.compp(lights || c.comp("light"))
    })

const tabledat = (c) => (tab) => 
    c.dat("table", {}, [], null, tab.map(r => r.join("\t")).join("\n"))

const volume = (c) => (gain) =>
    c.chop("audiodevicein")
        .c(c.chop("select", { channames: c.sp("chan1") ,}))
        .c(c.chop("resample", {"timeslice": c.tp(false), "method": c.mp(0), "relative": c.mp(0), "end": c.fp(0.03)}))
        .c(c.chop("math", { "gain": gain }))
        .c(c.chop("analyze", {  function: c.mp(6) }))

const volumef = (c) => (gain) => c.chan(c.ip(0), volume(gain))

// Once more for the people in the back:
// Has to be Commonjs export style (module.exports not export keyword)

const exportfs = { geo, render, tabledat, volume, volumef }

module.exports = (c) => {
    const newexports = {}
    Object.keys(exportfs).map(k => {
        newexports[k] = exportfs[k](c);
    })
    return newexports;
}