function GameObject()
{   
    this.name = "default";

    this.transform = new Transform();
    this.transform.gameobject = this;
};

GameObject.prototype.Initialize = function()
{
    
};

GameObject.prototype.Update = function()
{

};

GameObject.prototype.Draw = function ()
{

};

root.gameobject = new GameObject();
root.gameobject.name = "root";