export type PartialReflex =
  | Partial<client.Alias>
  | Partial<client.Trigger>
  | Partial<client.Event>
  | PartialFunction
  | Partial<client.Keybind>
  | PartialGroup;
export type PartialFunction = Partial<client.Function> & { codeFile?: string };
export type PartialGroup = Omit<Partial<client.Group>, 'items'> & { items?: PartialReflex[] };
export type PartialPackage = Omit<Partial<client.Package>, 'items'> & { items?: PartialReflex[] };

export type PartialAction =
  | Partial<client.ButtonAction>
  | Partial<client.CommandAction>
  | Partial<client.DisableAction>
  | Partial<client.DisablemeAction>
  | Partial<client.EnableAction>
  | Partial<client.FunctionAction>
  | Partial<client.GotoAction>
  | Partial<client.IfAction>
  | Partial<client.LabelAction>
  | Partial<client.NotificationAction>
  | Partial<client.NotifyAction>
  | Partial<client.RepeatAction>
  | PartialScriptAction
  | Partial<client.SoundAction>
  | Partial<client.StopAction>
  | Partial<client.VariableAction>
  | Partial<client.WaitAction>
  | Partial<client.WaitForAction>;
export type PartialScriptAction = Partial<client.ScriptAction> & { scriptFile?: string };
