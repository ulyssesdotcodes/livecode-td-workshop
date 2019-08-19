let utils = (require("utils.ldjs.js"))(c)

let cubeTex = c.top("ramp", {
    dat: c.datp(utils.tabledat([
        ["r", "g", "b", "a", "pos"],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0.33],
        [1, 0, 1, 1, 0.66],
        [1, 0, 0, 1, 1],
    ])),
    type: c.mp(2),
})

let volumeCube = c.sop("box").c(utils.geo({
    material: c.matp(c.mat("constant", {
        colormap: c.topp(cubeTex)
    }))
}))

let rendered = utils.render(volumeCube, c.comp("camera", {
    t: c.xyzp(
        c.multp(c.cosp(c.seconds), c.fp(5)), 
        c.fp(0), 
        c.multp(c.sinp(c.seconds), c.fp(5))),
    lookat: c.compp(volumeCube) ,
}))

let n = rendered

return [n.c(c.top("out")).out()]