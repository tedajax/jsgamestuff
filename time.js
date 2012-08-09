function Time()
{
    Time.last = 0;
    
    Time.deltaMillis = 0;
};

Time.Update = function()
{
    Time.deltaMillis = new Date().getTime() - Time.last;
    Time.last = new Date().getTime();
};

Time.Delta = function()
{
    return (!isNaN(Time.deltaMillis)) ? Time.deltaMillis / 1000.0 : 0.0;
};