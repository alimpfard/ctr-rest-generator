## REST API boilerplate generator

Generates a directory of js files that handle a given API specification (Citron DSL)


structure of the input file:

```
import generator: \*.

{ type declarations }
{ api point spec }

api generate | api describe
```

type declaration: 

```
'type' name '['
    type name,
    type name,
    ...
']'
```

the default types are: `int`, `double`, `boolean`, `string`, `typename[]`

api point spec:

```
point_type name '['
    { 'Request' '[' 
        type name,
        type name,
        ...
    ']'},
    { 'Response' '[' 
        type name,
        type name,
        ...
    ']'},
    { 'Action' string } | { 'Action' '[' string, string, ... ']' }
']'
```


api point specifications are of two types:

+ `endpoint`: no further actions, just a process step from input to output
+ `action`: can have many processing steps, short-circuiting on failure

see [the example](example/test.ctr) for an example