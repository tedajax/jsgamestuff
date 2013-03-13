Array.prototype.remove = function(from, to)
{
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Array.prototype.contains = function(obj)
{
    return (this.indexOf(obj) > -1);
}

Math.lerp = function(value1, value2, amount)
{
    return value1 + (value2 - value1) * amount;
};

function Util()
{
    
};

Util.CreateInheritance = function(descendant, parent)
{
    var sConstructor = parent.toString();
    var aMatch = sConstructor.match( /\s*function (.*)\(/ );
    
    if ( aMatch != null ) { descendant.prototype[aMatch[1]] = parent; }
    for (var m in parent.prototype) {
        descendant.prototype[m] = parent.prototype[m];
    }
};

Util.GetFileString = function(url)
{
    var request;

    if (window.XMLHttpRequest)
    {
        request = new XMLHttpRequest();
    }
    else
    {
        request = ActiveXObject("Microsoft.XMLHTTP");
    }

    request.open("GET", url, false);
    request.send();
    return request.responseText;
};

Util.WrapAngle = function(angle)
{
    result = angle;
    while (result < 0) result += Math.PI * 2;
    while (result > Math.PI * 2) result -= Math.PI * 2;
    return result;
};

if (Math.randomrange == undefined)
{
    Math.randomrange = function(min, max)
    {
        return Math.floor((Math.random() * max) + min);
    };
};

Util();