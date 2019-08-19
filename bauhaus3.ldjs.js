let w = c.ip(1280);
let h = c.ip(720);

const geo = (params) => c.comp("geometry", Object.assign({externaltox: c.sp("toxes/visuals/geo.tox")}, params))

const res = {
        resolutionw: w,
        resolutionh: h,
        outputresolution: c.mp(9),
    }

const render = 
    (g, cam, light) => c.top("render", {
        "lights": light === undefined ? c.compp([c.compe("light")]) : c.compp(light),
        "geometry": c.compp(g),
        "camera": cam === undefined ? c.compp([c.compe("camera")]) : c.compp(cam),
        resolutionw: c.ip(1920),
        resolutionh: c.ip(1080)
    })

let scale = (s) => s.c(c.sop("transform", { scale: c.fp(0.25)}))

let circ = scale(c.sop("circle"))
let rect = scale(c.sop("rectangle"))
let grid = scale(c.sop("grid"))

let merge = c.sop("merge").run([
    grid,
    circ,
    rect
])

let vals = 
    c.chop("sopto", { sop: c.sopp(merge)})
        .c(c.chop("select", {renamefrom: c.sp("tx ty"), renameto: c.sp("u v") , }))

let uvals = vals.c(c.chop("select", { channames: c.sp("u") }))
let vvals = vals.c(c.chop("select", { channames: c.sp("v") }))

let normalize = (chop) => 
    c.chop("math", {
        torange1: c.fp(0) ,
        torange2: c.fp(1) ,
        fromrange1: c.chan(c.ip(0), chop.c(c.chop("analyze", {
            function: c.mp(2),
        }))),
        fromrange2: c.chan(c.ip(0), chop.c(c.chop("analyze", {
            function: c.mp(1),
        })))
    }).run([
        chop
    ])

let merged = c.chop("merge").run([
    normalize(uvals),
    normalize(vvals),
])

let colored = 
    merged.c(
        c.chop("topto", {
            top: c.topp(c.top("ramp"), {
                type: c.mp(1),
            }),
        }))

let rendered = render(
    merge.c(geo()),
    c.comp("camera"),
    c.comp("light")
    )

let n = rendered;


return [n.c(c.top("out")).out(), colored.out()]