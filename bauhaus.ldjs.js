let w = c.ip(1280);
let h = c.ip(720);

const res = {
        resolutionw: w,
        resolutionh: h,
        outputresolution: c.mp(9),
    }

let spherescale = 0.05

let sop = 
    c.sop("copy").run([
        c.sop("sphere", {
            rad: c.xyzp(c.fp(spherescale), c.fp(spherescale), c.fp(spherescale)) ,
        }),
        c.sop("circle", {
            divs: c.ip(12) ,
        })
    ]);


const geo = (params) => c.comp("geometry", Object.assign({externaltox: c.sp("toxes/visuals/geo.tox")}, params))

const render = 
    (g, cam, light) => c.top("render", {
        "lights": light === undefined ? c.compp([c.compe("light")]) : c.compp(light),
        "geometry": c.compp(g),
        "camera": cam === undefined ? c.compp([c.compe("camera")]) : c.compp(cam),
        resolutionw: c.ip(1920),
        resolutionh: c.ip(1080)
    })

const dots = sop.c(geo({
        material: c.matp(c.mat("constant", {
            color: c.rgbp(c.fp(1), c.fp(0), c.fp(0))
        }))
    }))


const hours = c.sop("rectangle", {
    size: c.xyp(c.fp(0.2), c.fp(0.2)) ,
}).c(geo({
    material: c.matp(c.mat("constant", {
        color: c.rgbp(c.fp(0), c.fp(0), c.fp(0))
    }))
}))

const spheres = render(
    [dots, hours], 
    c.comp("camera"), 
    c.comp("light"))

const combined = c.top("composite", {
        operand: c.mp(31),
    }).run([
        spheres,
        c.top("circle", { 
            ...res,
            radius: c.xyp(c.fp(0.25), c.fp(0.25)), 
        })
    ])

const n = combined

return [n.c(c.top("out")).out()]