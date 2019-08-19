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

const noise = (seed) => c.chop("noise", {
    seed: c.fp(seed),
    type: c.mp(4),
    end: c.fp(15) ,
    endunit: c.mp(0),
    channelname: c.sp("tx ty tz") ,
})

const rgbn = (seed) =>
    c.chop("topto", {
        top: c.topp(c.top("noise", {
            seed: c.fp(seed),
            resolutionh: c.ip(9) ,
            resolutionw: c.ip(9) ,
            amp: c.fp(2),
            mono: c.tp(false) ,
        })),
    })
    .c(c.chop("shuffle", {
        method: c.mp(2),
    }))

const rotn = (seed) => 
    noise(seed).c(c.chop("math", {
        integer: c.mp(3),
    }))
    .c(c.chop("math", {
        gain: c.fp(90)
    }))
    .c(c.chop("rename", {
        renameto: c.sp("rx ry rz") ,
    }))

const finnoise = (seed) =>
    c.chop("merge").run([
        noise(seed),
        rgbn(seed),
        rotn(seed)
    ])


const rect = c.sop("rectangle", {
    size: c.xyp(c.fp(0.8), c.fp(0.8)) ,
})

const rectgeo = (seed) =>
    rect.c(geo({
            instancing: c.tp(true),
            instanceop: c.chopp(finnoise(seed)),
            instancetx: c.sp("tx"),
            instancety: c.sp("ty"),
            instancetz: c.sp("tz"),
            instancerx: c.sp("rx"),
            instancery: c.sp("ry"),
            instancerz: c.sp("rz"),
            instancer: c.sp("r"),
            instanceg: c.sp("g"),
            instanceb: c.sp("b"),
            material: c.matp(c.mat("constant"))
        }))

const rectinstances = (seed) =>
    render(
        rectgeo(seed),
        c.comp("camera", {
            t: c.xyzp(c.fp(3), c.fp(3), c.fp(5)),
            lookat: c.compp(rectgeo(seed)),
        }), 
        c.comp("light"))

const n = rectinstances(5);

return [n.c(c.top("out")).out()]