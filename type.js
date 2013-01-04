var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DTSDoc;
(function (DTSDoc) {
    (function (Accessibility) {
        Accessibility._map = [];
        Accessibility._map[0] = "Public";
        Accessibility.Public = 0;
        Accessibility._map[1] = "Private";
        Accessibility.Private = 1;
    })(DTSDoc.Accessibility || (DTSDoc.Accessibility = {}));
    var Accessibility = DTSDoc.Accessibility;
    ; ;
    var TSDocs = (function () {
        function TSDocs(text) {
            this.text = text;
        }
        return TSDocs;
    })();
    DTSDoc.TSDocs = TSDocs;    
    var ASTParameter = (function () {
        function ASTParameter(name, optional, type) {
            this.name = name;
            this.optional = optional;
            this.type = type;
        }
        ASTParameter.prototype.toString = function () {
            return this.name + ":" + this.type;
        };
        ASTParameter.prototype.toHTML = function (mod) {
            var span = $("<span/>");
            span.append($("<span/>").text(this.name + (this.optional ? "?" : "")));
            span.append(":");
            span.append(this.type.toHTML(mod));
            return span;
        };
        return ASTParameter;
    })();
    DTSDoc.ASTParameter = ASTParameter;    
    var ASTFuncionSignature = (function () {
        function ASTFuncionSignature(params, retType) {
            this.params = params;
            this.retType = retType;
        }
        ASTFuncionSignature.prototype.toHTML = function (mod) {
            var span = $('<span class="ts_signiture"/>');
            span.append(genParameters(mod, this.params));
            span.append(":");
            span.append(this.retType.toHTML(mod));
            return span;
        };
        return ASTFuncionSignature;
    })();
    DTSDoc.ASTFuncionSignature = ASTFuncionSignature;    
    function genParameters(mod, params) {
        var span = $('<span class="ts_params"/>');
        span.append("(");
        for(var i = 0; i < params.length; i++) {
            if(i > 0) {
                span.append(", ");
            }
            span.append(params[i].toHTML(mod));
        }
        span.append(")");
        return span;
    }
    function genFunctionSigniture(mod, params, retType) {
        var span = $('<span class="ts_signiture"/>');
        span.append(genParameters(mod, params));
        span.append(":");
        span.append(retType.toHTML(mod));
        return span;
    }
    var ASTType = (function () {
        function ASTType() { }
        ASTType.prototype.toHTML = function (mod) {
            return undefined;
        };
        return ASTType;
    })();
    DTSDoc.ASTType = ASTType;    
    var ASTTypeName = (function (_super) {
        __extends(ASTTypeName, _super);
        function ASTTypeName(name) {
                _super.call(this);
            this.name = name;
        }
        ASTTypeName.prototype.toHTML = function (mod) {
            if(this.name != "string" && this.name != "number" && this.name != "bool" && this.name != "any" && this.name != "void" && this.name != "Object") {
                var a = $("<a/>");
                a.attr("href", "#" + mod.getFullName(this.name));
                return a.text(this.name);
            } else {
                return $('<span/>').append(this.name);
            }
        };
        return ASTTypeName;
    })(ASTType);
    DTSDoc.ASTTypeName = ASTTypeName;    
    var ASTArrayType = (function (_super) {
        __extends(ASTArrayType, _super);
        function ASTArrayType(type) {
                _super.call(this);
            this.type = type;
        }
        ASTArrayType.prototype.toHTML = function (mod) {
            return $("<span/>").append(this.type.toHTML(mod)).append("[]");
        };
        return ASTArrayType;
    })(ASTType);
    DTSDoc.ASTArrayType = ASTArrayType;    
    var ASTModulePrefix = (function (_super) {
        __extends(ASTModulePrefix, _super);
        function ASTModulePrefix(name, type) {
                _super.call(this);
            this.name = name;
            this.type = type;
        }
        ASTModulePrefix.prototype.toHTML = function (mod) {
            return $("<span/>").append(this.name).append(".").append(this.type.toHTML(mod));
        };
        return ASTModulePrefix;
    })(ASTType);
    DTSDoc.ASTModulePrefix = ASTModulePrefix;    
    var ASTSpecifingType = (function (_super) {
        __extends(ASTSpecifingType, _super);
        function ASTSpecifingType(members) {
                _super.call(this);
            this.members = members;
        }
        ASTSpecifingType.prototype.toHTML = function (mod) {
            var span = $("<span/>").append("{ ");
            this.members.forEach(function (m) {
                span.append(m.toHTML(mod));
                span.append("; ");
            });
            span.append("}");
            return span;
        };
        return ASTSpecifingType;
    })(ASTType);
    DTSDoc.ASTSpecifingType = ASTSpecifingType;    
    var ASTFunctionTypeRef = (function (_super) {
        __extends(ASTFunctionTypeRef, _super);
        function ASTFunctionTypeRef(params, retType) {
                _super.call(this);
            this.params = params;
            this.retType = retType;
        }
        ASTFunctionTypeRef.prototype.toHTML = function (mod) {
            return $("<span/>").append(genParameters(mod, this.params)).append("=>").append(this.retType.toHTML(mod));
        };
        return ASTFunctionTypeRef;
    })(ASTType);
    DTSDoc.ASTFunctionTypeRef = ASTFunctionTypeRef;    
    var ASTModuleMember = (function () {
        function ASTModuleMember() { }
        ASTModuleMember.prototype.getGlobal = function () {
            return this.parent ? this.parent.getGlobal() : this instanceof ASTModule ? this : null;
        };
        ASTModuleMember.prototype.toHTML = function () {
            return undefined;
        };
        return ASTModuleMember;
    })();
    DTSDoc.ASTModuleMember = ASTModuleMember;    
    var ASTClassMember = (function () {
        function ASTClassMember() { }
        ASTClassMember.prototype.toHTML = function () {
            return undefined;
        };
        return ASTClassMember;
    })();
    DTSDoc.ASTClassMember = ASTClassMember;    
    var ASTInterfaceMember = (function () {
        function ASTInterfaceMember() { }
        ASTInterfaceMember.prototype.toHTML = function (mod) {
            return undefined;
        };
        return ASTInterfaceMember;
    })();
    DTSDoc.ASTInterfaceMember = ASTInterfaceMember;    
    var ASTModuleType = (function (_super) {
        __extends(ASTModuleType, _super);
        function ASTModuleType(name) {
                _super.call(this);
            this.name = name;
        }
        return ASTModuleType;
    })(ASTModuleMember);
    DTSDoc.ASTModuleType = ASTModuleType;    
    var ASTConstructor = (function (_super) {
        __extends(ASTConstructor, _super);
        function ASTConstructor(docs, params) {
                _super.call(this);
            this.docs = docs;
            this.params = params;
        }
        ASTConstructor.prototype.toHTML = function () {
            var span = $('<span class="ts_code ts_constructor"/>');
            span.append($('<a/>').attr("name", this.parent.name + "-constructor"));
            span.append("constructor");
            span.append(genParameters(this.parent.parent, this.params));
            return span;
        };
        return ASTConstructor;
    })(ASTClassMember);
    DTSDoc.ASTConstructor = ASTConstructor;    
    var ASTMethod = (function (_super) {
        __extends(ASTMethod, _super);
        function ASTMethod(docs, access, isStatic, name, sign) {
                _super.call(this);
            this.docs = docs;
            this.access = access;
            this.isStatic = isStatic;
            this.name = name;
            this.sign = sign;
        }
        ASTMethod.prototype.toHTML = function () {
            var span = $('<span class="ts_code ts_method"/>');
            span.append($('<a/>').attr("name", this.parent.name + "-" + this.name));
            span.append(this.isStatic ? "static " : "");
            span.append(this.name);
            span.append(this.sign.toHTML(this.parent.parent));
            return span;
        };
        return ASTMethod;
    })(ASTClassMember);
    DTSDoc.ASTMethod = ASTMethod;    
    var ASTField = (function (_super) {
        __extends(ASTField, _super);
        function ASTField(docs, access, isStatic, name, type) {
                _super.call(this);
            this.docs = docs;
            this.access = access;
            this.isStatic = isStatic;
            this.name = name;
            this.type = type;
        }
        ASTField.prototype.toString = function () {
            return this.name + ":" + this.type;
        };
        ASTField.prototype.toHTML = function () {
            var span = $('<span class="ts_code ts_field" />');
            span.append($('<a/>').attr("name", this.parent.name + "-" + this.name));
            span.append((this.isStatic ? "static " : "") + this.name + ":");
            span.append(this.type.toHTML(this.parent.parent));
            return span;
        };
        return ASTField;
    })(ASTClassMember);
    DTSDoc.ASTField = ASTField;    
    var ASTClass = (function (_super) {
        __extends(ASTClass, _super);
        function ASTClass(docs, name, superClass, members) {
                _super.call(this, name);
            this.docs = docs;
            this.superClass = superClass;
            this.members = members;
            this.derivedClasses = [];
        }
        ASTClass.prototype.toString = function () {
            var s = "class " + this.name + "{";
            this.members.forEach(function (m) {
                s += m.toString();
            });
            return s + "}";
        };
        ASTClass.prototype.getSuperClass = function () {
            if(this.superClass) {
                var sc = this.parent.findType(this.superClass.name);
                if(sc instanceof ASTClass) {
                    return sc;
                }
            }
            return null;
        };
        ASTClass.prototype.getFullName = function () {
            return this.parent.getFullName(this.name);
        };
        ASTClass.prototype.updateHierarchy = function () {
            var superClass = this.getSuperClass();
            if(superClass) {
                superClass.derivedClasses.push(this);
            }
        };
        ASTClass.prototype.toHierarchyHTML = function () {
            if(this.getSuperClass() || this.derivedClasses.length > 0) {
                var div = $('<div class="ts_hierarchey"/>');
                div.append($('<a/>').attr("href", '#' + this.getFullName()).append(this.name));
                if(this.derivedClasses.length > 0) {
                    div.append(this.derivedClasses.map(function (m) {
                        return m.toHierarchyHTML();
                    }));
                }
                return div;
            } else {
                return null;
            }
        };
        ASTClass.prototype.toHTML = function () {
            var _this = this;
            var p = $('<section class="ts_modulemember ts_class"/>');
            p.append($("<a/>").attr("name", this.getFullName()));
            p.append($('<h1 class="ts_modulemember_title ts_class_title" />').text("class " + this.name));
            var content = $('<section class="ts_modulemember_content"/>').appendTo(p);
            if(this.superClass) {
                content.append('<h3>Hierarchy</h3>');
                var hierarchy = $('<div/>');
                hierarchy.append(this.name);
                var superClass = this.getSuperClass();
                if(superClass) {
                    while(superClass) {
                        hierarchy.append(" ← ");
                        hierarchy.append($('<a/>').attr('href', "#" + superClass.getFullName()).append(superClass.name));
                        superClass = superClass.getSuperClass();
                    }
                } else {
                    hierarchy.append(" ← " + this.superClass);
                }
                content.append(hierarchy);
                content.append($('<hr/>'));
            }
            if(this.derivedClasses.length > 0) {
                content.append('<h3>Subclasses</h3>');
                var div = $('<div/>');
                for(var i = 0; i < this.derivedClasses.length; i++) {
                    if(i > 0) {
                        div.append(", ");
                    }
                    var c = this.derivedClasses[i];
                    div.append($('<a/>').attr('href', '#' + c.getFullName()).append(c.name));
                }
                content.append(div);
                content.append($('<hr/>'));
            }
            if(this.docs) {
                content.append('<h3>Description</h3>');
                content.append($('<div>').text(this.docs.text));
            }
            content.append('<h3>Members</h3>');
            this.members.forEach(function (m) {
                if(m.toHTML) {
                    var html = m.toHTML(_this);
                    if(html) {
                        content.append($('<div/>').append(html));
                    }
                }
            });
            return p;
        };
        return ASTClass;
    })(ASTModuleType);
    DTSDoc.ASTClass = ASTClass;    
    var ASTIIndexer = (function (_super) {
        __extends(ASTIIndexer, _super);
        function ASTIIndexer(docs, name, indexType, retType) {
                _super.call(this);
            this.docs = docs;
            this.name = name;
            this.indexType = indexType;
            this.retType = retType;
        }
        ASTIIndexer.prototype.toHTML = function (mod) {
            var span = $('<span class="ts_code ts_constructor"/>');
            span.append("[" + this.name + ":");
            span.append(this.indexType.toHTML(mod));
            span.append("]:");
            span.append(this.retType.toHTML(mod));
            return span;
        };
        return ASTIIndexer;
    })(ASTInterfaceMember);
    DTSDoc.ASTIIndexer = ASTIIndexer;    
    var ASTIMethod = (function (_super) {
        __extends(ASTIMethod, _super);
        function ASTIMethod(docs, name, sign) {
                _super.call(this);
            this.docs = docs;
            this.name = name;
            this.sign = sign;
        }
        ASTIMethod.prototype.toHTML = function (mod) {
            var span = $('<span class="ts_code ts_method"/>');
            span.append(this.name);
            span.append(this.sign.toHTML(mod));
            return span;
        };
        return ASTIMethod;
    })(ASTInterfaceMember);
    DTSDoc.ASTIMethod = ASTIMethod;    
    var ASTIConstructor = (function (_super) {
        __extends(ASTIConstructor, _super);
        function ASTIConstructor(docs, params, type) {
                _super.call(this);
            this.docs = docs;
            this.params = params;
            this.type = type;
        }
        ASTIConstructor.prototype.toHTML = function (mod) {
            var span = $('<span class="ts_code ts_constructor"/>');
            span.append("new");
            span.append(genParameters(mod, this.params));
            return span;
        };
        return ASTIConstructor;
    })(ASTInterfaceMember);
    DTSDoc.ASTIConstructor = ASTIConstructor;    
    var ASTIField = (function (_super) {
        __extends(ASTIField, _super);
        function ASTIField(docs, name, isOptional, type) {
                _super.call(this);
            this.docs = docs;
            this.name = name;
            this.isOptional = isOptional;
            this.type = type;
        }
        ASTIField.prototype.toHTML = function (mod) {
            return $('<span class="ts_code" />').append($("<span/>").text(this.name + (this.isOptional ? "?" : "") + ":").append(this.type.toHTML(mod)));
        };
        return ASTIField;
    })(ASTInterfaceMember);
    DTSDoc.ASTIField = ASTIField;    
    var ASTIFunction = (function (_super) {
        __extends(ASTIFunction, _super);
        function ASTIFunction(docs, params, retType) {
                _super.call(this);
            this.docs = docs;
            this.params = params;
            this.retType = retType;
        }
        ASTIFunction.prototype.toHTML = function (mod) {
            var span = $('<span class="ts_code ts_method"/>');
            span.append(genFunctionSigniture(mod, this.params, this.retType));
            return span;
        };
        return ASTIFunction;
    })(ASTInterfaceMember);
    DTSDoc.ASTIFunction = ASTIFunction;    
    var ASTInterface = (function (_super) {
        __extends(ASTInterface, _super);
        function ASTInterface(docs, name, interfaces, type) {
                _super.call(this, name);
            this.docs = docs;
            this.interfaces = interfaces;
            this.type = type;
        }
        ASTInterface.prototype.getFullName = function () {
            return this.parent.getFullName(this.name);
        };
        ASTInterface.prototype.toHTML = function () {
            var _this = this;
            var section = $('<section class="ts_modulemember ts_interface"/>');
            section.append($("<a/>").attr("name", this.getFullName()));
            section.append($('<h1 class="ts_modulemember_title ts_interface_title"/>').text("interface " + this.name));
            var content = $('<section class="ts_modulemember_content"/>').appendTo(section);
            this.type.members.forEach(function (m) {
                content.append($("<div/>").append(m.toHTML(_this.parent)));
            });
            return section;
        };
        return ASTInterface;
    })(ASTModuleType);
    DTSDoc.ASTInterface = ASTInterface;    
    var ASTFunction = (function (_super) {
        __extends(ASTFunction, _super);
        function ASTFunction(docs, name, sign) {
                _super.call(this);
            this.docs = docs;
            this.name = name;
            this.sign = sign;
        }
        ASTFunction.prototype.toHTML = function () {
            var p = $('<section class="ts_modulemember ts_function"/>');
            p.append($("<a/>").attr("name", "func_" + this.name));
            p.append($('<h1 class="ts_modulemember_title ts_function_title" />').text("function " + this.name));
            var content = $('<section class="ts_modulemember_content"/>').appendTo(p);
            var span = $('<span class="ts_code ts_method"/>').appendTo(content);
            span.append("function " + this.name);
            span.append(this.sign.toHTML(this.parent));
            return p;
        };
        return ASTFunction;
    })(ASTModuleMember);
    DTSDoc.ASTFunction = ASTFunction;    
    var ASTEnum = (function (_super) {
        __extends(ASTEnum, _super);
        function ASTEnum(docs, name, members) {
                _super.call(this, name);
            this.docs = docs;
            this.members = members;
        }
        ASTEnum.prototype.getFullName = function () {
            return this.parent.getFullName(this.name);
        };
        ASTEnum.prototype.toHTML = function () {
            var section = $('<section class="ts_modulemember ts_enum"/>');
            section.append($("<a/>").attr("name", this.getFullName()));
            section.append($('<h1 class="ts_modulemember_title ts_enum_title"/>').text("enum " + this.name));
            this.members.forEach(function (m) {
                section.append($("<div/>").text(m));
            });
            return section;
        };
        return ASTEnum;
    })(ASTModuleType);
    DTSDoc.ASTEnum = ASTEnum;    
    var ASTVar = (function (_super) {
        __extends(ASTVar, _super);
        function ASTVar(docs, name, type) {
                _super.call(this);
            this.docs = docs;
            this.name = name;
            this.type = type;
        }
        ASTVar.prototype.toString = function () {
            return this.name;
        };
        ASTVar.prototype.toHTML = function () {
            var section = $('<section class="ts_modulemember ts_var" />');
            section.append($('<h1 class="ts_modulemember_title ts_var_title" />').text("var " + this.name));
            var content = $('<section class="ts_modulemember_content"/>').appendTo(section);
            content.append($('<span class="ts_code"/>').append('var ' + this.name).append(":").append(this.type.toHTML(this.parent)));
            return section;
        };
        return ASTVar;
    })(ASTModuleMember);
    DTSDoc.ASTVar = ASTVar;    
    var ASTModule = (function (_super) {
        __extends(ASTModule, _super);
        function ASTModule(docs, name, members) {
                _super.call(this);
            this.docs = docs;
            this.name = name;
            this.members = members;
        }
        ASTModule.prototype.findType = function (name) {
            var splitted = name.split('.');
            if(splitted.length == 1) {
                var targetType = splitted[0];
                for(var i = 0; i < this.members.length; i++) {
                    var member = this.members[i];
                    if(member instanceof ASTModuleType) {
                        var c = member;
                        if(c.name == targetType) {
                            return c;
                        }
                    }
                }
            } else {
                if(splitted.length > 0) {
                    var targetModule = splitted[0];
                    for(var i = 0; i < this.members.length; i++) {
                        var member = this.members[i];
                        if(member instanceof ASTModule) {
                            var m = member;
                            if(m.name == targetModule) {
                                var t = this.getTypeFromFullName(splitted.slice(1).join("."));
                                if(t) {
                                    return t;
                                }
                            }
                        }
                    }
                }
            }
            if(this.parent) {
                return this.parent.findType(name);
            }
            return null;
        };
        ASTModule.prototype.getTypeFromFullName = function (name) {
            var splitted = name.split('.');
            if(splitted.length == 1) {
                var targetType = splitted[0];
                for(var i = 0; i < this.members.length; i++) {
                    var member = this.members[i];
                    if(member instanceof ASTModuleType) {
                        var c = member;
                        if(c.name == targetType) {
                            return c;
                        }
                    }
                }
            } else {
                if(splitted.length > 0) {
                    var targetModule = splitted[0];
                    for(var i = 0; i < this.members.length; i++) {
                        var member = this.members[i];
                        if(member instanceof ASTModule) {
                            var m = member;
                            if(m.name == targetModule) {
                                return this.getTypeFromFullName(splitted.slice(1).join("."));
                            }
                        }
                    }
                }
            }
            return null;
        };
        ASTModule.prototype.getFullName = function (name) {
            var type = this.findType(name);
            if(type) {
                var n = type.name;
                var mod = type.parent;
                while(mod.parent) {
                    n = mod.name + "." + n;
                    mod = mod.parent;
                }
                return n;
            } else {
                return name;
            }
        };
        ASTModule.prototype.updateHierarchy = function () {
            this.members.forEach(function (m) {
                if(m instanceof ASTModule) {
                    (m).updateHierarchy();
                } else {
                    if(m instanceof ASTClass) {
                        (m).updateHierarchy();
                    }
                }
            });
        };
        ASTModule.prototype.toHierarchyHTML = function () {
            var div = $('<div/>');
            this.members.forEach(function (m) {
                if(m instanceof ASTModule) {
                    div.append((m).toHierarchyHTML());
                } else {
                    if(m instanceof ASTClass) {
                        var clazz = m;
                        if(clazz.derivedClasses.length > 0) {
                            div.append(clazz.toHierarchyHTML());
                        }
                    }
                }
            });
            return div;
        };
        ASTModule.prototype.toString = function () {
            var s = "module " + this.name + "{";
            this.members.forEach(function (m) {
                s += m.toString();
            });
            return s + "}";
        };
        ASTModule.prototype.toHTML = function () {
            var section = $('<section class="ts_modulemember ts_module"/>');
            section.append($('<h1 class="ts_modulemember_title ts_module_title"/>').text("module " + this.name));
            var content = $('<section />').appendTo(section);
            if(this.docs) {
                content.append($('<p class="ts_modulemember_description"/>').html(this.docs.text));
            }
            this.members.forEach(function (m) {
                content.append(m.toHTML());
            });
            return section;
        };
        return ASTModule;
    })(ASTModuleMember);
    DTSDoc.ASTModule = ASTModule;    
})(DTSDoc || (DTSDoc = {}));
