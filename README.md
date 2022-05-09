# check-circle-json
## install
`npm install check-circle-json`
## usage
```ts
const a = {
  b: {
    c: null
  }
} as any
a.b.c = a
const [path1, path2] = getCirclePath(a)
console.log(path1, path2) // [ 'b', 'c', 'b' ], [ 'b' ]
```
```ts
const a = {
  b: {
    c: null
  }
}
console.log(getCirclePath(a)) // null
```
