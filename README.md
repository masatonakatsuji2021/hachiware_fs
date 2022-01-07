# Hachiware_fs

<a href="https://github.com/masatonakatsuji2021/hachiware_fs/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/masatonakatsuji2021/hachiware_fs"></a>
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/masatonakatsuji2021/hachiware_fs">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/masatonakatsuji2021/hachiware_fs">

An extended wrapper package for the file operation package "fs".  
A package for getting file / directory information and copying / deleting in a deep hierarchy.

---

## # Sample Source

Place the sample source in the test directory in the package.

```
L sample1.js
L sample2.js
L sample3.js
```

- sample1.js .... Get file / directory information list
- sample2.js .... Bulk copy of files / directories.
- sample3.js .... Bulk delete files / directories

---

## # How do you use this?

First, install the npm package with the following command.

```
npm i hachiware_fs
```
All you have to do is add the package require code to index.js etc. and you're ready to go.  

```javascript
const fs = require("hachiware_fs");
```

---

## # Get a list of files/directories up to the deep hierarchy

You can get a list of files / directories up to a deep hierarchy by using the `` deepReadDir`` method.

```javascript
const fs = require("hachiware_fs");

console.log(fs.ddepReadDir("sample_directory"));
```

Specify the directory path (relative is also possible) in the argument.  
It is assumed that the specified directory path exists.

The return value will be the following object.

```
{
   file:
   [ 'testdirectory/dir_1/dir_1a/test.txt',
     'testdirectory/dir_1/dir_1b/test.txt',
     'testdirectory/dir_1/test.txt',
     'testdirectory/test.txt' ],
  dir:
   [ 'testdirectory/dir_1',
     'testdirectory/dir_1/dir_1a',
     'testdirectory/dir_1/dir_1b',
     'testdirectory/dir_2',
     'testdirectory/dir_2/dir_2a',
     'testdirectory/dir_2/dir_2b' ] 
}
```

---

## # Bulk copy of files/directories

By using the `` deepCopy`` method, you can easily make a batch copy for each directory.

```javascript
const fs = require("hachiware_fs");

fs.ddepReadDir("sample_directory","__copy_sample_directory");
```

Specify the copy source path and copy destination path as arguments, respectively.

This alone copies the files and directories in the source path to the destination path all at once.

---

## # Bulk delete files/directories

By using the `` deepDelete`` method, you can easily delete all directories at once.

```javascript
const fs = require("hachiware_fs");

fs.deepDelete("sample_directory");
```

Specify the path to be deleted in the argument.

You can delete the specified path with just this.

---

Author : Nakatsuji Masato.
