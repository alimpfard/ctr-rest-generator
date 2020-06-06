## REST + GraphQL API boilerplate generator

Generates a directory of js files that handle a given API specification (Citron DSL), and optionally creates crude documentation for them.


structure of the input file:

```
import generator: \*.

{ type declarations }
{ api point spec }

api generate | api describe | api docs
```

type declaration:

```
'type' name '['
    type name,
    type name,
    ...
']'
```

database models (mongodb is used) can be described as:

```
'model' name '['
    type name [attrs],
    ...
']'
```

where an attribute in `attrs` can be any of:
- `nullable`
    makes the value nullable
    Note that this does not apply to input items (inside Request), and is only used for validation and GraphQL type generation
- `pure '[' value ']'`
    The value is a static element of the model, and should not be stored in the database
    (used for defining constants)
- `default: value`
    Sets the default value of the entry
    If, in either input or output, the value of this entry is undefined or null, the default value is substituted.
- `secret`
    The value is to be treated as a secret
    It will be hidden from GraphQL types, and will not show up in objects constructed by the model objects

and utility functions (sort of a common check step or input modification step, for instance user login) can be described as:

```
'function` name '['
    type name,
    type name,
    ...
']' '->' type name.
```

the default types are: `int`, `double`, `boolean`, `string`, `typename[]`

kinds that generate types are: `enum`, `reference`

api point spec:

```
point_type name {point mode} '['
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
    { 'Action' string } | { 'Action' '[' string, string, ... ']' },
    { 'Before' '[' function_name, ... '] }
']'
```

`point mode` depends on the type of the point
- endpoint
    - `graphql`
        Creates a graphql query API endpoint
    - `pure`
        Promise the compiler that this endpoint will not modify the database
        The compiler might optimise some things if this flag is given
- action
    - `pure`
        Promise the compiler that this endpoint will not modify the database
        The compiler will necessarily generate a GET endpoint for this action

`Requests` specifications can optionally have a custom decoder (JSON is otherwise used),
similarly, `Response` specs can have a custom encoder (JSON is the default) like so:

`Request [ name-type-pairs... ] decoder ['custom.decoder']`

api point specifications are of two types:

+ `endpoint`: no further actions, just a process step from input to output
+ `action`: can have many processing steps, short-circuiting on failure

### Note about GraphQL
If you wish to reate graphql endpoints, you _must_ tell the compiler so, and specify the mountpoint of graphql (and optionally, whether you wish to enable graphiql):

`api graphql` will enable graphql and return an object you can talk to about graphql

For instance,

```
api graphql
    root: '/graphql',
    graphiql: True.
```
Will enable graphql, mount it at `/graphql` and enable graphiql

see [the example](example/test.ctr) for an example
