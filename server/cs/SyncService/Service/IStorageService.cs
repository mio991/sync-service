using System.IO;
using System.Threading.Tasks;
using System.Threading;

namespace SyncService
{
    public interface IStorageService{
        Task<string> Create(Stream data, CancellationToken token = default);
        Task Update(string id, Stream data, CancellationToken token = default);
        Stream Read(string id); 
    }   
}