namespace Helper
{
    public class GlobalMethod
    {
        public static object ProblemAtSend(string message)
        {
            Console.WriteLine(message);
            return new
            {
                status = "faild",
                data = "Error Occurred: pls contact with hupa"
            };
        }
    }
}
