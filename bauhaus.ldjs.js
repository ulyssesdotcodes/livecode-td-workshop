
let tabledat = (tab) => 
    c.dat("table", {}, [], null, tab.map(r => r.join("\t")).join("\n"))

let ramp = tabledat([
    ["r", "g", "b", "a", "pos"],
    [0.25, 0.9, 0, 1, 0],
    [0.5, 0.2, 0.2, 0.2, 0.6],
    [0, 0.9, 0.2, 0.2, 1]
])

let rampt3 = c.top("ramp", {
    dat: c.datp(ramp) ,
    type: c.mp(2),
    phase: c.seconds ,
}).c(c.top("transform", {
    s: c.xyp(c.fp(0.2), c.fp(0.2)) ,
    extend: c.mp(2),
})).c(c.top("texture3d"))

let n = c.top("timemachine").run([
    rampt3,
    c.top("noise", {
        type: c.mp(1),
        t: c.xyzp(0, 0, c.seconds, 1) , 
    })
])

return [n.c(c.top("out")).out()]