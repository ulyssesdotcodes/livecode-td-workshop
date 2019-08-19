## OPs

Each section will be referenced in the other sections as a simple substitution for simplicity. Indentation is recommended but not required.

### Node

> `c.<optype>("<opname>")`

`c.top("rectangle")`


### Connection

> `<Node>.c(<Node>)`

`c.top("rectangle").c(c.top("edge"))`

### Multi-input

> `<Node>.run([<Node>, <Node>])`

```
c.top("composite").run([
    c.top("rectangle"), 
    c.top("noise")
])
```

## Parameters

### Types

| Parameter Type | Code |
| ---------- | ---------- |
| Float | c.fp(float)|
| Int | c.ip(int) |
| String | c.sp("value") |
| Toggle (bool) | c.tp(true \| false) |
| Menu | c.mp(index) |
| XY | c.xyp(float param, float param) |
| XYZ | c.xyp(float param, float param, float param) |
| XYZW | c.xyp(float param, float param, float param, float param) |
| RGB | c.xyp(float param, float param, float param) |
| RGBA | c.xyp(float param, float param, float param, float param) |
| DAT | c.datp(\<dat\>) |
| MAT | c.matp(\<mat\>) |
| CHOP | c.chopp(\<chop\>) |
| TOP | c.topp(\<top\>) |
| COMP | c.compp(\<comp\>) |


### Methods

| TD Method | LD Method|
| ------------ | ------------ |
| absTime.seconds | c.seconds |
| + | c.addp(\<f1\>, \<f2\>) |
| - | c.subp(\<f1\>, \<f2\>) |
| * | c.multp(\<f1\>, \<f2\>) |
| / | c.divp(\<f1\>, \<f2\>) |
| % | c.modp(\<f1\>, \<f2\>) |
| ^ | c.powp(\<f1\>, \<f2\>) |
| math.sin | c.sinp(\<f\>) |
| math.cos | c.cosp(\<f\>) |

Channel

> `c.chan(<index>, <chop>)`


```
c.chan(c.ip(0), c.chop("wave"))
```
