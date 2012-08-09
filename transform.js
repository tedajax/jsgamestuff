function Transform()
{    
    this.position = new Vec2(0, 0);
    this.rotation = 0.0;
    this.scale = new Vec2(1, 1);
    
    this.matrix = new Matrix3();
    
    this.parent = root;
    this.children = new Array();
    this.gameobject = null;
};

Transform.prototype.SetParent = function(parent)
{
    if (this.parent != null)
    {
        var index = this.parent.children.indexOf(this);
        if (index >= 0)
            this.parent.children.splice(index, 1);
    }
    
    if (parent == null)
    {
        this.parent = root;
        root.children.push(this);
    }
    else
    {
        this.parent = parent;
        parent.children.push(this);
    }
};

Transform.prototype.TransformContext = function(ctx)
{  
    transformStack = new Array();
    stackCount = 0;
    slider = this.parent;
    while (slider != null)
    {
        transformStack[stackCount++] = slider;
        slider = slider.parent;
    }
    
    for (var i = transformStack.length - 1; i >= 0; i--)
    {
        var t = transformStack[i];
        ctx.transform(t.matrix.m[0][0], t.matrix.m[0][1], t.matrix.m[1][0], t.matrix.m[1][1], t.matrix.m[0][2], t.matrix.m[1][2]);
    }
    
    ctx.transform(this.matrix.m[0][0], this.matrix.m[0][1], this.matrix.m[1][0], this.matrix.m[1][1], this.matrix.m[0][2], this.matrix.m[1][2]);
};

Transform.prototype.BuildMatrix = function()
{
    this.matrix = Matrix3.IDENTITY.Clone();
    this.matrix.Mul(Matrix3.CreateTranslation(this.position));
    this.matrix.Mul(Matrix3.CreateScale(this.scale));
    this.matrix.Mul(Matrix3.CreateRotation(this.rotation));    
};

Transform.DrawSceneGraphToPanel = function(node, panel, level)
{
    if (level == null) level = 0;
    if (level == 0) panel.lines.splice(0, panel.lines.length);
    
    panel.lines.push(Array(level * 4).join(" ") + node.gameobject.name);
    
    for (var i = 0; i < node.children.length; i++)
        Transform.DrawSceneGraphToPanel(node.children[i], panel, level + 1);
};

var root = new Transform();
root.parent = null;