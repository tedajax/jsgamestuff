function GameObject()
{   
    this.name = "default";

    this.transform = new Transform();
    this.transform.gameobject = this;

    this.colliders = [];
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

GameObject.prototype.SendMessage = function(funcName)
{
	
};

root.gameobject = new GameObject();
root.gameobject.name = "root";