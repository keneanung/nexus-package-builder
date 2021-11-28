export class ButtonAction implements client.ButtonAction{
  action: "button" = 'button';
  label = '';
  buttonid = '';
  buttonaction: "label" | "command" | "highlight" | "unhighlight" | "default" = 'label';
  command = '';

  constructor(partialButtonAction: Partial<ButtonAction>){
    if (partialButtonAction.label !== undefined) {
      this.label = partialButtonAction.label;
    }

    if (partialButtonAction.buttonid !== undefined) {
      this.buttonid = partialButtonAction.buttonid;
    }

    if (partialButtonAction.buttonaction !== undefined) {
      this.buttonaction = partialButtonAction.buttonaction;
    }

    if (partialButtonAction.command !== undefined) {
      this.command = partialButtonAction.command;
    }
  }
}