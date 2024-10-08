var React = require('react');
var fa = require('react-icons/fa');
var formik = require('formik');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
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

var _excluded = ["isLoading", "className"];
function Button(props) {
  var customClassName = "button is-info is-large is-outlined " + props.className;
  var isLoading = props.isLoading,
    buttonProps = _objectWithoutPropertiesLoose(props, _excluded);
  if (isLoading) {
    customClassName = customClassName + " is-loading";
  }
  return React.createElement("button", Object.assign({
    className: customClassName
  }, buttonProps), props.children);
}

var _excluded$1 = ["isLoading", "className"];
function CellButton(props) {
  var customClassName = props.className;
  var isLoading = props.isLoading,
    buttonProps = _objectWithoutPropertiesLoose(props, _excluded$1);
  if (isLoading) {
    customClassName = customClassName + " is-loading";
  }
  return React.createElement("button", Object.assign({
    className: customClassName
  }, buttonProps), props.children);
}

function ErrorScreen(props) {
  return React.createElement(React.Fragment, null, props.children);
}

function FileForm(props) {
  var _useState = React.useState("Ningún archivo seleccionado"),
    filename = _useState[0],
    setFilename = _useState[1];
  return React.createElement("div", {
    className: "\n                file \n                is-boxed \n                is-centered \n                inv-file-responsive \n                has-name\n                is-large\n            "
  }, React.createElement("label", {
    className: "file-label"
  }, React.createElement("input", {
    className: "file-input",
    type: "file",
    name: "resume",
    onChange: function onChange(event) {
      var files = event.currentTarget.files;
      props.onChange({
        file: files[0],
        filename: files[0].name
      });
      setFilename(files[0].name);
    }
  }), React.createElement("span", {
    className: "file-cta"
  }, React.createElement("span", {
    className: "file-icon"
  }, React.createElement("i", {
    className: "fas fa-upload"
  }, React.createElement(fa.FaUpload, null))), React.createElement("span", {
    className: "file-label"
  }, "Seleccionar archivo\u2026")), React.createElement("span", {
    className: "file-name"
  }, filename)));
}

var _excluded$2 = ["className", "style", "children"];
function GhostButton(_ref) {
  var children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return React.createElement("button", Object.assign({
    className: 'button is-ghost',
    style: {
      whiteSpace: "normal",
      textAlign: "start",
      wordBreak: "break-word",
      wordWrap: "break-word"
    }
  }, rest), children);
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

function ProductCard(p) {
  var _p$prodsSolicitar$fin;
  return React.createElement("div", {
    className: 'card box',
    style: {
      width: 300
    }
  }, React.createElement("div", {
    className: 'card-image columns is-vcentered is-centered mt-2'
  }, React.createElement("img", {
    src: p.img,
    alt: 'Placeholder',
    style: {
      objectFit: 'contain',
      width: 250,
      height: 200
    }
  })), React.createElement("div", {
    className: 'card-content'
  }, React.createElement("div", {
    className: 'content'
  }, React.createElement("h6", {
    className: 'title is-6',
    style: {
      height: 50,
      overflow: 'hidden',
      whiteSpace: 'normal',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word',
      wordWrap: 'break-word'
    }
  }, p.descripcion), React.createElement("div", {
    className: 'subtitle is-6'
  }, React.createElement("div", null, p.precio !== '' ? p.precio + " " + p.currency : ''), React.createElement("div", null, p.uni_medida)), React.createElement("div", {
    className: 'subtitle is-6 is-italic'
  }, 'Disponible: ' + p.stock), React.createElement("span", {
    className: 'tag is-info is-medium'
  }, p.noParte))), React.createElement("footer", {
    className: 'card-footer'
  }, !p.prodsSolicitar.some(function (e) {
    return e.id === p.idProd;
  }) ? React.createElement("a", {
    href: '#!',
    className: 'card-footer-item',
    onClick: function onClick() {
      var addItem = true;
      if (p.onClickAgregar !== undefined) {
        addItem = p.onClickAgregar(p.idProd);
      }
      if (addItem) {
        p.setProdsSolicitar(function (prodsSolicitar) {
          return [].concat(prodsSolicitar, [{
            id: p.idProd,
            codigo: p.noParte,
            cantidad: '1',
            precioU: p.precio,
            precioT: p.precio,
            numPedido: '0',
            folio: '0',
            comentarios: p.descripcion,
            tipo_equipo: '',
            numEconomico: '',
            currency: p.currency,
            stock: p.stock,
            idOdc: p.idOdc
          }]);
        });
      }
    }
  }, "Agregar") : React.createElement(React.Fragment, null, React.createElement("a", {
    href: '#!',
    className: 'card-footer-item',
    onClick: function onClick() {
      var _p$prodsSolicitar$ind;
      var index = p.prodsSolicitar.findIndex(function (e) {
        return e.id === p.idProd;
      });
      var cant = parseInt((_p$prodsSolicitar$ind = p.prodsSolicitar[index]) === null || _p$prodsSolicitar$ind === void 0 ? void 0 : _p$prodsSolicitar$ind.cantidad) - 1;
      if (cant < 1) {
        p.setProdsSolicitar(function (prodsSolicitar) {
          return prodsSolicitar.filter(function (f) {
            return f.id !== p.idProd;
          });
        });
      } else {
        p.setProdsSolicitar(function (prodsSolicitar) {
          return prodsSolicitar.map(function (f) {
            if (f.id === p.idProd) {
              return _extends({}, f, {
                cantidad: "" + cant,
                precioT: "" + cant * parseFloat(f.precioU)
              });
            } else {
              return f;
            }
          });
        });
      }
    }
  }, "-"), React.createElement("input", {
    className: 'input card-footer-item has-text-link ml-6 mt-3',
    pattern: '[0-9]*',
    value: (_p$prodsSolicitar$fin = p.prodsSolicitar.find(function (e) {
      return e.id === p.idProd;
    })) === null || _p$prodsSolicitar$fin === void 0 ? void 0 : _p$prodsSolicitar$fin.cantidad,
    onChange: function onChange(e) {
      p.setProdsSolicitar(function (prodsSolicitar) {
        return prodsSolicitar.map(function (f) {
          if (f.id === p.idProd) {
            if (parseInt(e.target.value) > parseInt(f.stock)) return _extends({}, f, {
              cantidad: "" + f.stock,
              precioT: "" + parseInt(f.stock) * parseFloat(f.precioU)
            });
            return _extends({}, f, {
              cantidad: "" + e.target.value,
              precioT: "" + parseInt(e.target.value) * parseFloat(f.precioU)
            });
          } else {
            return f;
          }
        });
      });
    },
    onBlur: function onBlur(e) {
      if (e.currentTarget.value === '') {
        p.setProdsSolicitar(function (prodsSolicitar) {
          return prodsSolicitar.filter(function (f) {
            return f.id !== p.idProd;
          });
        });
      }
      var value = parseInt(e.currentTarget.value);
      if (value < 1) {
        p.setProdsSolicitar(function (prodsSolicitar) {
          return prodsSolicitar.filter(function (f) {
            return f.id !== p.idProd;
          });
        });
      } else {
        p.setProdsSolicitar(function (prodsSolicitar) {
          return prodsSolicitar.map(function (f) {
            if (f.id === p.idProd) {
              return _extends({}, f, {
                cantidad: "" + value,
                precioT: "" + value * parseFloat(f.precioU)
              });
            } else {
              return f;
            }
          });
        });
      }
    }
  }), React.createElement("a", {
    className: 'card-footer-item'
  }), React.createElement("a", {
    href: '#!',
    className: 'card-footer-item',
    onClick: function onClick() {
      var _p$prodsSolicitar$ind2;
      var index = p.prodsSolicitar.findIndex(function (e) {
        return e.id === p.idProd;
      });
      var cant = parseInt((_p$prodsSolicitar$ind2 = p.prodsSolicitar[index]) === null || _p$prodsSolicitar$ind2 === void 0 ? void 0 : _p$prodsSolicitar$ind2.cantidad) + 1;
      p.setProdsSolicitar(function (prodsSolicitar) {
        return prodsSolicitar.map(function (f) {
          if (f.id === p.idProd) {
            if (cant > parseInt(f.stock)) return _extends({}, f, {
              cantidad: "" + f.stock,
              precioT: "" + parseInt(f.stock) * parseFloat(f.precioU)
            });
            return _extends({}, f, {
              cantidad: "" + cant,
              precioT: "" + cant * parseFloat(f.precioU)
            });
          } else {
            return f;
          }
        });
      });
    }
  }, "+"))));
}

function ProductsBill(props) {
  console.log(props.prodsSolicitar);
  var usdList = [];
  var mxnList = [];
  props.prodsSolicitar.forEach(function (p) {
    var _p$currency;
    var strippedCurrency = (_p$currency = p.currency) === null || _p$currency === void 0 ? void 0 : _p$currency.trim();
    if (strippedCurrency === "USD") {
      usdList.push(p);
    } else if (strippedCurrency === "MXN") {
      mxnList.push(p);
    }
  });
  return React.createElement(React.Fragment, null, React.createElement("h5", {
    className: "title is-5"
  }, "Materiales Solicitados (", props.prodsSolicitar.length, ")"), React.createElement("div", {
    className: 'block'
  }, mxnList.length == 0 && usdList.length == 0 && React.createElement("table", {
    className: "table is-striped is-hoverable"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Item"), React.createElement("th", null, "Precio"), React.createElement("th", null, "Cantidad"), React.createElement("th", null, "Subtotal"))), React.createElement("tfoot", null, React.createElement("tr", null, React.createElement("th", null, "Total"), React.createElement("th", null), React.createElement("th", null), React.createElement("th", null, "$", 0.0.toFixed(2))))), mxnList.length > 0 && React.createElement("table", {
    className: "table is-striped is-hoverable"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Item"), React.createElement("th", null, "Precio"), React.createElement("th", null, "Cantidad"), React.createElement("th", null, "Subtotal"))), React.createElement("tfoot", null, React.createElement("tr", null, React.createElement("th", null, "Total"), React.createElement("th", null), React.createElement("th", null), React.createElement("th", null, "$", mxnList.reduce(function (acc, p) {
    return acc + parseFloat(p.precioT);
  }, 0).toFixed(2), " MXN"))), React.createElement("tbody", null, mxnList.map(function (p) {
    return React.createElement("tr", {
      key: p.codigo
    }, React.createElement("td", null, p.comentarios), React.createElement("td", null, "$", p.precioU, " MXN"), React.createElement("td", null, p.cantidad), React.createElement("td", null, "$", parseFloat(p.precioT).toFixed(2), " MXN"));
  }))), usdList.length > 0 && React.createElement("table", {
    className: "table is-striped is-hoverable"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Item"), React.createElement("th", null, "Precio"), React.createElement("th", null, "Cantidad"), React.createElement("th", null, "Subtotal"))), React.createElement("tfoot", null, React.createElement("tr", null, React.createElement("th", null, "Total"), React.createElement("th", null), React.createElement("th", null), React.createElement("th", null, "$", usdList.reduce(function (acc, p) {
    return acc + parseFloat(p.precioT);
  }, 0).toFixed(2), " USD"))), React.createElement("tbody", null, usdList.map(function (p) {
    return React.createElement("tr", {
      key: p.codigo
    }, React.createElement("td", null, p.comentarios), React.createElement("td", null, "$", p.precioU, " USD"), React.createElement("td", null, p.cantidad), React.createElement("td", null, "$", parseFloat(p.precioT).toFixed(2), " USD"));
  })))));
}

var _excluded$3 = ["label"];
function SelectInput(_ref) {
  var label = _ref.label,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
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
    className: "select is-fullwidth is-info is-medium mt-3 mb-3"
  }, React.createElement("select", Object.assign({}, field, props)))), meta.touched && meta.error ? React.createElement("div", {
    className: "ml-2 mt-1 has-text-danger is-size-7"
  }, meta.error) : null);
}

var _excluded$4 = ["label"];
function TextInput(_ref) {
  var label = _ref.label,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$4);
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
exports.CellButton = CellButton;
exports.ErrorScreen = ErrorScreen;
exports.FileForm = FileForm;
exports.GhostButton = GhostButton;
exports.LoadingBar = LoadingBar;
exports.ProductCard = ProductCard;
exports.ProductsBill = ProductsBill;
exports.SelectInput = SelectInput;
exports.TextInput = TextInput;
//# sourceMappingURL=index.js.map
