function uploadImage(imagePath) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: 'wxsj/picture', // 服务器上传地址
      filePath: imagePath,
      name: 'file', // 根据服务器端的要求
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data); // 假设服务器返回的数据在res.data中
        } else {
          reject('上传失败: ' + res.errMsg);
        }
      },
      fail: (err) => {
        reject('上传出错: ' + err.errMsg);
      }
    });
  });
}
export function uploadAllImages(imagesArray) {
  const uploadPromises = [];

  imagesArray.forEach(subArray => {
    if (Array.isArray(subArray)) {
      subArray.forEach(imagePath => {
        uploadPromises.push(uploadImage(imagePath));
      });
    }
  });

  Promise.all(uploadPromises)
    .then(results => {
      console.log('所有图片上传成功:', results);
      uni.showToast({
        title: '所有图片已上传',
        icon: 'success'
      });
    })
    .catch(error => {
      console.error('上传过程中发生错误:', error);
      uni.showToast({
        title: '上传错误',
        icon: 'none'
      });
    });
}
