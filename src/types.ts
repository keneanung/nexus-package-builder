export type PartialReflex =
  | Partial<client.Alias>
  | Partial<client.Trigger>
  | Partial<client.Event>
  | Partial<client.Function>
  | Partial<client.Keybind>
  | (Omit<Partial<client.Group>, 'items'> & { items?: PartialReflex[] });
export type PartialPackage = Omit<Partial<client.Package>, 'items'> & { items?: PartialReflex[] };
