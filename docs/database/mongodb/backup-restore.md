# MongoDB Backup and Restore

```shell
// Create container
docker pull mongo:4.2.17
docker run -d --name my-mongo -v ~/mongodb/dump:/dump mongo:4.2.17

// Check version and test connect
docker exec -it my-mongo bash
root@d93c98c18ae3:/# mongo --version
root@d93c98c18ae3:/# momgodump --version
root@d93c98c18ae3:/# mongorestore --version
root@d93c98c18ae3:/# mongo mongodb://schat:schat12345@10.240.13.38:27017/schat?authSource=schat

// Backup
docker exec -it my-mongo bash
root@d93c98c18ae3:/# momgodump --help
root@d93c98c18ae3:/# mongodump -h 10.240.12.102:27017 -u appqa2schat -p tahcs2aqppa --db=schat --archive=/dump/v4.gz --gzip
root@d93c98c18ae3:/# ls -la /dump/

// Restore
docker exec -it my-mongo bash
root@d93c98c18ae3:/# mongorestore --help
root@d93c98c18ae3:/# mongorestore -h 10.240.13.38:27017 -u schat -p schat12345 --db=schat --drop --archive=/dump/v4.gz --gzip --noIndexRestore
```
