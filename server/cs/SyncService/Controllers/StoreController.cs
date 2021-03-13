using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SyncService
{
    [Route("storage")]
    public class StoreController : ControllerBase
    {
        private const string CONTENT_TYPE = "application/octet-stream";

        private readonly ILogger<StoreController> logger;
        private readonly IStorageService storageService;

        public StoreController(ILogger<StoreController> logger, IStorageService storageService)
        {
            this.logger = logger;
            this.storageService = storageService;
        }

        [HttpGet("{id}")]
        public FileResult Get([FromRoute] string id)
        {
            return File(storageService.Read(id), CONTENT_TYPE);
        }

        [HttpPost]
        public async Task<ActionResult<string>> Create(){
            if(Request.ContentType != CONTENT_TYPE){
                return BadRequest("Invalid Content-Type");
            }
            return Ok(await storageService.Create(Request.Body));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromRoute] string id){
            if(Request.ContentType != CONTENT_TYPE){
                return BadRequest("Invalid Content-Type");
            }
            await storageService.Update(id, Request.Body);
            return Ok();
        }
    }
}
