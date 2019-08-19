
const incrArr = Array.prototype.fill(0, 0, 10)
    .map((_, idx) => idx);

const textTopArr = incrArr.map(value => c.top("text", {
    text: c.sp(value)
}))

const n = 
    c.top("composite", { operand: c.mp(2), })
        .run(textTopArr)

return [n.c(c.top("out")).out()]
