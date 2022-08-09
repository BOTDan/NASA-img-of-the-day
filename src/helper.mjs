// @ts-check

/**
 * Creates a slot and appends it to the given parent
 * @param {ParentNode} parent 
 * @param {string} [name] The name of the slot
 * @returns The created slot
 */
export function createSlot(parent, name) {
  const slot = document.createElement("slot");
  if (name) {
    slot.name = name;
  }
  parent.append(slot);
  return slot;
}

/**
 * Creates an element with a slot attribute, appending it to the given parent
 * @param {ParentNode} parent The parent containing the slot
 * @param {string} slotName The name of the slot to use
 * @param {string} tagName The HTML tag to create
 * @param {string | HTMLElement} [tagContent] The content to append to the new tag 
 * @returns The created element
 */
export function createSlotContent(parent, slotName, tagName, tagContent) {
  const tag = document.createElement(tagName);
  tag.slot = slotName;
  (typeof tagContent === "string")
    ? tag.textContent = tagContent
    : tag.append(tagContent);
  parent.append(tag);
  return tag;
}

/**
 * Creates an element, appending it to the parent and giving it any desired classes
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName The HTML tag to create
 * @param {ParentNode | null} parent The parent to attach to
 * @param  {...string} [classNames] Any classes to append to the element
 * @returns The created element
 */
export function createEl(tagName, parent, ...classNames) {
  const el = document.createElement(tagName);
  classNames.forEach((className) => el.classList.add(className));
  if (parent) {
    parent.append(el);
  }
  return el;
}

const a = document.createElement("button");