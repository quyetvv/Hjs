/** @jsx h */

function h(type, props, ...children) {
    return { type, props: props || {}, children };
  }
  
  function setBooleanProp($target, name, value) {
    if (value) {
      $target.setAttribute(name, value);
      $target[name] = true;
    } else {
      $target[name] = false;
    }
  }
  
  function isCustomProp(name) {
    return false;
  }
  
  function setProp($target, name, value) {
    if (isCustomProp(name)) {
      return;
    } else if (name === 'className') {
      $target.setAttribute('class', value);
    } else if (typeof value === 'boolean') {
      setBooleanProp($target, name, value);
    } else {
      $target.setAttribute(name, value);
    }
  }
  
  function setProps($target, props) {
    Object.keys(props).forEach(name => {
      setProp($target, name, props[name]);
    });
  }
  
  function createElement(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    setProps($el, node.props);
    node.children
      .map(createElement)
      .forEach($el.appendChild.bind($el));
    return $el;
  }
  
  //--------------------------------------------------
  
  const f = (
    <ul style="list-style: none;">
      <li className="item">item 1</li>
      <li className="item">
        <input type="checkbox" checked={true} />
        <input type="text" disabled={false} />
      </li>
    </ul>
  );
  
  const $root = document.getElementById('root');
  $root.appendChild(createElement(f));