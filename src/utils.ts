import { Alias } from './classes/alias';
import { ButtonAction } from './classes/buttonAction';
import { CommandAction } from './classes/commandAction';
import { DisableAction } from './classes/disableAction';
import { DisablemeAction } from './classes/disablemeAction';
import { EnableAction } from './classes/enableAction';
import { NexusFunction } from './classes/function';
import { FunctionAction } from './classes/functionAction';
import { GotoAction } from './classes/gotoAction';
import { Group } from './classes/group';
import { IfAction } from './classes/ifAction';
import { LabelAction } from './classes/labelAction';
import { NotificationAction } from './classes/notificationAction';
import { NotifyAction } from './classes/notifyAction';
import { RepeatAction } from './classes/repeatAction';
import { ScriptAction } from './classes/scriptAction';
import { SoundAction } from './classes/soundAction';
import { StopAction } from './classes/stopAction';
import { VariableAction } from './classes/variableAction';
import { WaitAction } from './classes/waitAction';
import { WaitForAction } from './classes/waitForAction';
import {
  PartialAction,
  PartialAlias,
  PartialFunction,
  PartialGroup,
  PartialReflex,
  PartialScriptAction,
} from './types';

/**
 * Generator for IDs.
 */
export class IdGenerator {
  private lastId = 0;

  /**
   * Returns a unique identifier.
   *
   * @returns {number} A new id
   */
  getId = (): number => ++this.lastId;
}

const isPartialFunction = (partial: PartialReflex): partial is PartialFunction => {
  return partial.type !== undefined && partial.type === 'function';
};

const isPartialGroup = (partial: PartialReflex): partial is PartialGroup => {
  return partial.type !== undefined && partial.type === 'group';
};

const isPartialAlias = (partial: PartialReflex): partial is PartialAlias => {
  return partial.type !== undefined && partial.type === 'alias';
};

/**
 * Converts an array of potentially partial reflexes to an array of complete reflexes.
 *
 * @param {PartialReflex[]} reflexes The array of partial reflexes to convert.
 * @param {IdGenerator} idGenerator The IdGenerator to use to generate IDs of new items.
 * @param {string} packageDefinitionFile The path to the package definition file.
 * @returns {client.Reflex[]} The converted array of (now complete) reflexes.
 */
export const convertNexusReflexArray = (
  reflexes: PartialReflex[],
  idGenerator: IdGenerator,
  packageDefinitionFile: string,
) => {
  const result: client.Reflex[] = [];
  for (const element of reflexes) {
    let convertedElement: client.Reflex;
    if (isPartialFunction(element)) {
      convertedElement = new NexusFunction(element, idGenerator, packageDefinitionFile);
    } else if (isPartialGroup(element)) {
      convertedElement = new Group(element, idGenerator, packageDefinitionFile);
    } else if (isPartialAlias(element)) {
      convertedElement = new Alias(element, idGenerator, packageDefinitionFile);
    } else {
      throw new Error('Unrecognized reflex type. Are you missing the "type" property?');
    }
    result.push(convertedElement);
  }
  return result;
};

const isPartialScriptAction = (partialAction: PartialAction): partialAction is PartialScriptAction => {
  return partialAction.action !== undefined && partialAction.action === 'script';
};

const isPartialFunctionAction = (partialAction: PartialAction): partialAction is Partial<client.FunctionAction> => {
  return partialAction.action !== undefined && partialAction.action === 'function';
};

const isPartialButtonAction = (partialAction: PartialAction): partialAction is Partial<client.ButtonAction> => {
  return partialAction.action !== undefined && partialAction.action === 'button';
};

const isPartialCommandAction = (partialAction: PartialAction): partialAction is Partial<client.CommandAction> => {
  return partialAction.action !== undefined && partialAction.action === 'command';
};

const isPartialDisableAction = (partialAction: PartialAction): partialAction is Partial<client.DisableAction> => {
  return partialAction.action !== undefined && partialAction.action === 'disable';
};

const isDisablemeAction = (partialAction: PartialAction): partialAction is client.DisablemeAction => {
  return partialAction.action !== undefined && partialAction.action === 'disableme';
};

const isPartialEnableAction = (partialAction: PartialAction): partialAction is Partial<client.EnableAction> => {
  return partialAction.action !== undefined && partialAction.action === 'enable';
};

const isPartialGotoAction = (partialAction: PartialAction): partialAction is Partial<client.GotoAction> => {
  return partialAction.action !== undefined && partialAction.action === 'goto';
};

const isPartialIfAction = (partialAction: PartialAction): partialAction is Partial<client.IfAction> => {
  return partialAction.action !== undefined && partialAction.action === 'if';
};

const isPartialLabelAction = (partialAction: PartialAction): partialAction is Partial<client.LabelAction> => {
  return partialAction.action !== undefined && partialAction.action === 'label';
};

const isPartialNotificationAction = (
  partialAction: PartialAction,
): partialAction is Partial<client.NotificationAction> => {
  return partialAction.action !== undefined && partialAction.action === 'notification';
};

const isPartialNotifyAction = (partialAction: PartialAction): partialAction is Partial<client.NotifyAction> => {
  return partialAction.action !== undefined && partialAction.action === 'notify';
};

const isPartialRepeatAction = (partialAction: PartialAction): partialAction is Partial<client.RepeatAction> => {
  return partialAction.action !== undefined && partialAction.action === 'repeat';
};

const isPartialSoundAction = (partialAction: PartialAction): partialAction is Partial<client.SoundAction> => {
  return partialAction.action !== undefined && partialAction.action === 'sound';
};

const isStopAction = (partialAction: PartialAction): partialAction is client.StopAction => {
  return partialAction.action !== undefined && partialAction.action === 'stop';
};

const isPartialVariableAction = (partialAction: PartialAction): partialAction is Partial<client.VariableAction> => {
  return partialAction.action !== undefined && partialAction.action === 'variable';
};

const isPartialWaitAction = (partialAction: PartialAction): partialAction is Partial<client.WaitAction> => {
  return partialAction.action !== undefined && partialAction.action === 'wait';
};

const isPartialWaitForAction = (partialAction: PartialAction): partialAction is Partial<client.WaitForAction> => {
  return partialAction.action !== undefined && partialAction.action === 'waitfor';
};

/**
 * Converts an array of potentially partial actions to an array of complete actions.
 *
 * @param {PartialAction[]} actions The array of partial actions to convert.
 * @param {string} packageDefinitionFile The path to the package definition file.
 * @returns {client.Action[]} The converted array of (now complete) actions.
 */
export const convertNexusActionArray = (actions: PartialAction[], packageDefinitionFile: string) => {
  const result: client.Action[] = [];

  for (const element of actions) {
    let convertedElement: client.Action;

    if (isPartialScriptAction(element)) {
      convertedElement = new ScriptAction(element, packageDefinitionFile);
    } else if (isPartialFunctionAction(element)) {
      convertedElement = new FunctionAction(element);
    } else if (isPartialButtonAction(element)) {
      convertedElement = new ButtonAction(element);
    } else if (isPartialCommandAction(element)) {
      convertedElement = new CommandAction(element);
    } else if (isPartialDisableAction(element)) {
      convertedElement = new DisableAction(element);
    } else if (isDisablemeAction(element)) {
      convertedElement = new DisablemeAction();
    } else if (isPartialEnableAction(element)) {
      convertedElement = new EnableAction(element);
    } else if (isPartialGotoAction(element)) {
      convertedElement = new GotoAction(element);
    } else if (isPartialIfAction(element)) {
      convertedElement = new IfAction(element);
    } else if (isPartialLabelAction(element)) {
      convertedElement = new LabelAction(element);
    } else if (isPartialNotificationAction(element)) {
      convertedElement = new NotificationAction(element);
    } else if (isPartialNotifyAction(element)) {
      convertedElement = new NotifyAction(element);
    } else if (isPartialRepeatAction(element)) {
      convertedElement = new RepeatAction(element);
    } else if (isPartialSoundAction(element)) {
      convertedElement = new SoundAction(element);
    } else if (isStopAction(element)) {
      convertedElement = new StopAction();
    } else if (isPartialVariableAction(element)) {
      convertedElement = new VariableAction(element);
    } else if (isPartialWaitAction(element)) {
      convertedElement = new WaitAction(element);
    } else if (isPartialWaitForAction(element)) {
      convertedElement = new WaitForAction(element);
    } else {
      throw new Error('Unrecognized action type. Are you missing the "action" property?');
    }
    result.push(convertedElement);
  }

  return result;
};
