using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace SyncService
{
    public class FileStorageService : IStorageService
    {
        private readonly string rootPath;

        public FileStorageService(string rootPath)
        {
            this.rootPath = rootPath;
            Directory.CreateDirectory(rootPath);
        }

        public Task<string> Create(Stream data, CancellationToken token)
        {
            return CreateInternal(data, token, 3);
        }

        private async Task<string> CreateInternal(Stream data, CancellationToken token, int tries){
            try {
                string id = Guid.NewGuid().ToString("N");

                using(FileStream file = File.Open(Path.Join(this.rootPath, id), FileMode.CreateNew)){
                    await data.CopyToAsync(file, token);
                }

                return id;
            }
            catch(IOException ex){
                if(tries>0)
                {
                    return await CreateInternal(data, token, tries - 1);
                }else{
                    throw ex;
                }
            }
        }

        public Stream Read(string id) =>File.OpenRead(Path.Join(rootPath, id));

        public async Task Update(string id, Stream data, CancellationToken token)
        {
            using(FileStream file = File.Open(Path.Join(this.rootPath, id), FileMode.Truncate)){
                await data.CopyToAsync(file, token);
            }
        }
    }

}