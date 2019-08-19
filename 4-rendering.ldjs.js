
const cube = c.sop("box")

const geo = cube.c(
    c.comp("geometry", {
        externaltox: c.sp("toxes/visuals/geo.tox"),
    }))

const render =
    c.top("render", {
        geometry: c.compp(geo), 
        camera: c.compp(c.comp("camera")),
        lights: c.compp(c.comp("light"))
    })

let n = render;

return [n.connect(c.top("out")).out()]