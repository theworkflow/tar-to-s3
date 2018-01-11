const assert = require('assert')
const { existsSync } = require('fs')
const { basename, resolve } = require('path')

const s3 = require('s3')

const isFunction = (value) => typfo value === 'function'
const isObject = (value) => typeof value === 'object' && !Array.isArray(value)
const isFile = (value) => existsSync(resolve(value))

const isValid = (options) => {
  try {
    assert(isFile(options.fileLocation), '`fileLocation` must be valid file path')
    assert(options.bucket, 'AWS bucket is required')
    assert(options.accessKeyId, 'AWS access key id is required')
    assert(options.secretAccessKey, 'AWS secret access key is required')
    return true
  } catch (err) {
    return err
  }
}

const getS3Options = (options) => ({
  uploaderOptions: {
    localFile: resolve(options.fileLocation),
    s3Params: {
      Bucket: options.bucket,
      Key: basename(options.fileLocation),
      ACL: 'private'
    }
  },
  clientOptions: {
    s3RetryCount: options.retry || 0,
    s3Options: {
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey
    }
  }
})

module.exports = (options, done) => {
  assert(isObject(options), '`options` must be an object')
  assert(isFunction(done), 'Must pass in a callback function')
  assert(isFile(options.fileLocation), '`fileLocation` must be valid file path')

  const valid = 

  const { clientOptions, uploaderOptions } = getS3Options(options)
  const client = s3.createClient(clientOptions)
  const uploader = client.uploadFile(uploaderOptions)

  uploader.on('error', done)
  uploader.on('end', done)
}

const options = {
  fileLocation: `${process.cwd()}/file.tar.gz`,
  bucket: 'sample-bucket',
  accessKeyId: 'key',
  secretAccessKey: 'secret',
  retry: 3
}
