var React = require('react');
var formik = require('formik');

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
  return React.createElement("button", Object.assign({
    className: className
  }, buttonProps), props.children);
}

function ErrorScreen(props) {
  return React.createElement(React.Fragment, null, props.children);
}

function LoadingBar() {
  return React.createElement("div", {
    className: "columns is-centered is-mobile"
  }, React.createElement("div", {
    className: "column is-four-fifths"
  }, React.createElement("progress", {
    className: "progress is-small is-info",
    max: "100"
  }, "60%")));
}

var _excluded$1 = ["label"];
function SelectInput(_ref) {
  var label = _ref.label,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var _useField = formik.useField(props),
    field = _useField[0],
    meta = _useField[1];
  return React.createElement("div", {
    className: "block field"
  }, React.createElement("label", {
    htmlFor: props.id || props.name,
    className: "subtitle is-4 has-text-grey"
  }, label), React.createElement("br", null), React.createElement("div", {
    className: "control is-expanded"
  }, React.createElement("div", {
    className: "select is-fullwidth is-info is-medium mt-3"
  }, React.createElement("select", Object.assign({}, field, props)))), meta.touched && meta.error ? React.createElement("div", {
    className: "ml-2 mt-1 has-text-danger is-size-7"
  }, meta.error) : null);
}

var _excluded$2 = ["label"];
function TextInput(_ref) {
  var label = _ref.label,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  var _useField = formik.useField(props),
    field = _useField[0],
    meta = _useField[1];
  return React.createElement("div", {
    className: "block"
  }, React.createElement("label", {
    htmlFor: props.id || props.name,
    className: "subtitle is-4 has-text-grey"
  }, label), React.createElement("input", Object.assign({
    className: "input"
  }, field, props)), meta.touched && meta.error ? React.createElement("div", {
    className: "ml-2 mt-1 has-text-danger is-size-7"
  }, meta.error) : null);
}

exports.Button = Button;
exports.ErrorScreen = ErrorScreen;
exports.LoadingBar = LoadingBar;
exports.SelectInput = SelectInput;
exports.TextInput = TextInput;
//# sourceMappingURL=index.js.map
