// โหลด package "gulp" มาใช้ (บรรทัดนี้ต้องใส่เสมอ)
var gulp = require('gulp');
var run = require('gulp-run');//run command
var livereload = require('gulp-livereload');//reload
// สร้าง task ชื่อว่า "taskName" ขึ้นมา พร้อมกับระบุงานที่จะให้ task นี้ทำ
gulp.task('njpos', function(e) {
    // ระบุว่า task นี้ทำอะไร
    livereload.listen();//reload data
    console.log('running njpos');
    //Check when file on change
    gulp.watch(['*.js','*.html','templates/*.html','components/*.html','css/*.css','js/*.js','lib/ionic/css/*.css'],function(e){
      console.log('change '+e);
    });
});
gulp.task('runelectron',function(){
   return run('electron .').exec();
});
gulp.task('default', ['njpos','runelectron']);
