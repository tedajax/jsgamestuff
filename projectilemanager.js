function ProjectileManager()
{
    ProjectileManager.projectiles = new Array();
};

ProjectileManager.Add = function(position, direction)
{
    var newProjectile = new Projectile();
    newProjectile.position.Clone(position);
    newProjectile.direction.Clone(direction);
    ProjectileManager.projectiles.push(newProjectile);
};

ProjectileManager.Update = function()
{
    for (var i = 0; i < ProjectileManager.projectiles.length; i++)
    {
        if (ProjectileManager.projectiles[i] != null)
            ProjectileManager.projectiles[i].update();
    }
    
    for (var i = 0; i < ProjectileManager.projectiles.length; i++)
    {
        if (ProjectileManager.projectiles[i].destroy)
                ProjectileManager.projectiles.remove(i, i);
    }
};

ProjectileManager.Draw = function()
{
    for (var i = 0; i < ProjectileManager.projectiles.length; i++)
    {
        if (ProjectileManager.projectiles[i] != null)
            ProjectileManager.projectiles[i].draw();
    }
};

ProjectileManager();