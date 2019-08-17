
let volume = (gain) =>
    c.chop("audiodevicein")
        .c(c.chop("select", { channames: c.sp("chan1") ,}))
        .c(c.chop("resample", {"timeslice": c.tp(false), "method": c.mp(0), "relative": c.mp(0), "end": c.fp(0.03)}))
        .c(c.chop("math", { "gain": gain }))
        .c(c.chop("analyze", {  function: c.mp(6) }))

let volumef = (gain) => c.chan(c.ip(0), volume(gain))

let volumerect =
    c.top("rectangle", {
        size: c.xyp(c.fp(300), volumef(100)), 
    })

let n = volumerect;

return [n.connect(c.top("out")).out()]