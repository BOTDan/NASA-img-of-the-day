// @ts-check

/**
 * Creates a slot and appends it to the given parent
 * @param {HTMLElement} parent 
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
 * @param {HTMLElement} parent The parent containing the slot
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