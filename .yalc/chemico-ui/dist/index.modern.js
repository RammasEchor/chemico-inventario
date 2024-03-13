import { createElement, Fragment } from 'react';
import { useField } from 'formik';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var _excluded = ["isLoading"];
function Button(props) {
  var className = "button is-info is-large is-outlined";
  var isLoading = props.isLoading,
    buttonProps = _objectWithoutPropertiesLoose(props, _excluded);
  if (isLoading) {
    className = className + " is-loading";
  }
  return createElement("button", Object.assign({
    className: className
  }, buttonProps), props.children);
}

function ErrorScreen(props) {
  return createElement(Fragment, null, props.children);
}

function LoadingBar() {
  return createElement("div", {
    className: "columns is-centered is-mobile"
  }, createElement("div", {
    className: "column is-four-fifths"
  }, createElement("progress", {
    className: "progress is-small is-info",
    max: "100"
  }, "60%")));
}

var _excluded$1 = ["label"];
function SelectInput(_ref) {
  var label = _ref.label,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var _useField = useField(props),
    field = _useField[0],
    meta = _useField[1];
  return createElement("div", {
    className: "block field"
  }, createElement("label", {
    htmlFor: props.id || props.name,
    className: "subtitle is-4 has-text-grey"
  }, label), createElement("br", null), createElement("div", {
    className: "control is-expanded"
  }, createElement("div", {
    className: "select is-fullwidth is-info is-medium mt-3"
  }, createElement("select", Object.assign({}, field, props)))), meta.touched && meta.error ? createElement("div", {
    className: "ml-2 mt-1 has-text-danger is-size-7"
  }, meta.error) : null);
}

var _excluded$2 = ["label"];
function TextInput(_ref) {
  var label = _ref.label,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  var _useField = useField(props),
    field = _useField[0],
    meta = _useField[1];
  return createElement("div", {
    className: "block"
  }, createElement("label", {
    htmlFor: props.id || props.name,
    className: "subtitle is-4 has-text-grey"
  }, label), createElement("input", Object.assign({
    className: "input"
  }, field, props)), meta.touched && meta.error ? createElement("div", {
    className: "ml-2 mt-1 has-text-danger is-size-7"
  }, meta.error) : null);
}

export { Button, ErrorScreen, LoadingBar, SelectInput, TextInput };
//# sourceMappingURL=index.modern.js.map
