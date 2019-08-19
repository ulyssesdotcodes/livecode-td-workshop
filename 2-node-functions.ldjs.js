
let noise = c.top("noise", { 
    type: c.mp(1),
    mono: c.tp(false),
    period: c.fp(1.5) ,
    exp:c.fp(0.25),
})

let edgescomposite = (amount) => c.cc((inputs) => 
    c.top("composite", { "operand": c.mp(0) })
        .run([
            inputs[0].c(c.top("edge")),
            inputs[0].c(c.top("level", {"opacity": amount}))
        ]))

return [noise.connect(edgescomposite(0.2)).c(c.top("out")).out()]