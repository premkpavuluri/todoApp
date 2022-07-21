const generateAttributes = (list) => {
  return list.map(([key, value]) => `${key}="${value}"`).join(' ');
};

const tag = (name, attributes, content) =>
  `<${name} ${generateAttributes(attributes)}>${content}</${name}>`;

const generateHtml = ([tagName, attributes, ...body]) => {
  const innerHTML = body.map(element => {
    return Array.isArray(element) ? generateHtml(element) : element;
  }).join('');

  return tag(tagName, attributes, innerHTML);
};

module.exports = { generateHtml };
