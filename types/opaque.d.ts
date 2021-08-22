type Opaque<T, K> = T & { __TYPE__: K };

type NominalString<K extends string> = `NominalString<${K}>`;
