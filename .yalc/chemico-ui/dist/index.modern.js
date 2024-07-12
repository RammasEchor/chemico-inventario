import { createElement, Fragment, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useField } from 'formik';

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
  return createElement("button", Object.assign({
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
  return createElement("button", Object.assign({
    className: customClassName
  }, buttonProps), props.children);
}

function ErrorScreen(props) {
  return createElement(Fragment, null, props.children);
}

function FileForm(props) {
  var _useState = useState("Ningún archivo seleccionado"),
    filename = _useState[0],
    setFilename = _useState[1];
  return createElement("div", {
    className: "\n                file \n                is-boxed \n                is-centered \n                inv-file-responsive \n                has-name\n                is-large\n            "
  }, createElement("label", {
    className: "file-label"
  }, createElement("input", {
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
  }), createElement("span", {
    className: "file-cta"
  }, createElement("span", {
    className: "file-icon"
  }, createElement("i", {
    className: "fas fa-upload"
  }, createElement(FaUpload, null))), createElement("span", {
    className: "file-label"
  }, "Seleccionar archivo\u2026")), createElement("span", {
    className: "file-name"
  }, filename)));
}

var _excluded$2 = ["className", "style", "children"];
function GhostButton(_ref) {
  var children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return createElement("button", Object.assign({
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
  return createElement("div", {
    className: "columns is-centered is-mobile"
  }, createElement("div", {
    className: "column is-four-fifths"
  }, createElement("progress", {
    className: "progress is-small is-info",
    max: "100"
  }, "60%")));
}

function ProductCard(p) {
  var _p$prodsSolicitar$fin;
  return createElement("div", {
    className: "card box",
    style: {
      width: 300
    }
  }, createElement("div", {
    className: "card-image columns is-vcentered is-centered mt-2"
  }, createElement("img", {
    src: p.img,
    alt: "Placeholder",
    style: {
      objectFit: "contain",
      width: 250,
      height: 200
    }
  })), createElement("div", {
    className: "card-content"
  }, createElement("div", {
    className: "content"
  }, createElement("h6", {
    className: "title is-6",
    style: {
      height: 50,
      overflow: "hidden",
      whiteSpace: "normal",
      textOverflow: "ellipsis",
      wordBreak: "break-word",
      wordWrap: "break-word"
    }
  }, p.descripcion), createElement("div", {
    className: "subtitle is-6"
  }, createElement("div", null, p.precio !== "" ? p.precio + " " + p.currency : ""), createElement("div", null, p.uni_medida)), createElement("div", {
    className: "subtitle is-6 is-italic"
  }, "Disponible: " + p.stock), createElement("span", {
    className: "tag is-info is-medium"
  }, p.noParte))), createElement("footer", {
    className: "card-footer"
  }, !p.prodsSolicitar.some(function (e) {
    return e.id === p.idProd;
  }) ? createElement("a", {
    href: "#!",
    className: "card-footer-item",
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
            cantidad: "1",
            precioU: p.precio,
            precioT: p.precio,
            numPedido: "0",
            folio: "0",
            comentarios: p.descripcion,
            tipo_equipo: "",
            numEconomico: "",
            currency: p.currency,
            stock: p.stock
          }]);
        });
      }
    }
  }, "Agregar") : createElement(Fragment, null, createElement("a", {
    href: "#!",
    className: "card-footer-item",
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
  }, "-"), createElement("input", {
    className: "input card-footer-item has-text-link ml-6 mt-3",
    pattern: "[0-9]*",
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
      if (e.currentTarget.value === "") {
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
  }), createElement("a", {
    className: "card-footer-item"
  }), createElement("a", {
    href: "#!",
    className: "card-footer-item",
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
              precioT: "" + cant * parseInt(f.precioU)
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
  return createElement(Fragment, null, createElement("h5", {
    className: "title is-5"
  }, "Materiales Solicitados (", props.prodsSolicitar.length, ")"), createElement("div", {
    className: 'block'
  }, mxnList.length == 0 && usdList.length == 0 && createElement("table", {
    className: "table is-striped is-hoverable"
  }, createElement("thead", null, createElement("tr", null, createElement("th", null, "Item"), createElement("th", null, "Precio"), createElement("th", null, "Cantidad"), createElement("th", null, "Subtotal"))), createElement("tfoot", null, createElement("tr", null, createElement("th", null, "Total"), createElement("th", null), createElement("th", null), createElement("th", null, "$", 0.0.toFixed(2))))), mxnList.length > 0 && createElement("table", {
    className: "table is-striped is-hoverable"
  }, createElement("thead", null, createElement("tr", null, createElement("th", null, "Item"), createElement("th", null, "Precio"), createElement("th", null, "Cantidad"), createElement("th", null, "Subtotal"))), createElement("tfoot", null, createElement("tr", null, createElement("th", null, "Total"), createElement("th", null), createElement("th", null), createElement("th", null, "$", mxnList.reduce(function (acc, p) {
    return acc + parseFloat(p.precioT);
  }, 0).toFixed(2), " MXN"))), createElement("tbody", null, mxnList.map(function (p) {
    return createElement("tr", {
      key: p.codigo
    }, createElement("td", null, p.comentarios), createElement("td", null, "$", p.precioU, " MXN"), createElement("td", null, p.cantidad), createElement("td", null, "$", parseFloat(p.precioT).toFixed(2), " MXN"));
  }))), usdList.length > 0 && createElement("table", {
    className: "table is-striped is-hoverable"
  }, createElement("thead", null, createElement("tr", null, createElement("th", null, "Item"), createElement("th", null, "Precio"), createElement("th", null, "Cantidad"), createElement("th", null, "Subtotal"))), createElement("tfoot", null, createElement("tr", null, createElement("th", null, "Total"), createElement("th", null), createElement("th", null), createElement("th", null, "$", usdList.reduce(function (acc, p) {
    return acc + parseFloat(p.precioT);
  }, 0).toFixed(2), " USD"))), createElement("tbody", null, usdList.map(function (p) {
    return createElement("tr", {
      key: p.codigo
    }, createElement("td", null, p.comentarios), createElement("td", null, "$", p.precioU, " USD"), createElement("td", null, p.cantidad), createElement("td", null, "$", parseFloat(p.precioT).toFixed(2), " USD"));
  })))));
}

var _excluded$3 = ["label"];
function SelectInput(_ref) {
  var label = _ref.label,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
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
    className: "select is-fullwidth is-info is-medium mt-3 mb-3"
  }, createElement("select", Object.assign({}, field, props)))), meta.touched && meta.error ? createElement("div", {
    className: "ml-2 mt-1 has-text-danger is-size-7"
  }, meta.error) : null);
}

var _excluded$4 = ["label"];
function TextInput(_ref) {
  var label = _ref.label,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$4);
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

export { Button, CellButton, ErrorScreen, FileForm, GhostButton, LoadingBar, ProductCard, ProductsBill, SelectInput, TextInput };
//# sourceMappingURL=index.modern.js.map
