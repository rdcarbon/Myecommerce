using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BuggyController : BaseAPIController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest();
        }
        [HttpGet("unauthorized")]
        public ActionResult GetUnAuthorized()
        {
             return Unauthorized();

        }
        [HttpGet ("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This the first error.");
            ModelState.AddModelError("Problem2", "This is the second error.");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError(){
            throw new Exception("This is a server error");
        }
    }
}
