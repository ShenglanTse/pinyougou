<?php
 require('./connect.php'); $sql = "CREATE DATABASE shop"; $result = mysqli_query($conn,$sql); if($result){ echo "数据库创建成功"; }else{ echo "数据库创建失败"; } ?>