//keydown按下键盘事件
$(document).keydown(function(event){
	switch (event.keyCode){
		case 37: //left
		//分析向左移动的逻辑
		//moveLeft()方法完成向左的逻辑，返回值是Boolean类型，判断是否可以向左移动	
			if(moveLeft()){	
				//重新的随机生成一个数字
				setTimeout("generateOneNumber()", 210);
	            //判断这次的移动完成之后，游戏是否结束
	            setTimeout("isgameover()", 300);	
			}
			break;
		case 38: //up
			if (moveUp()) {
	                setTimeout("generateOneNumber()", 210);
	                setTimeout("isgameover()", 300);
	         }
			break;
		case 39:   //right
			if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
           }
			break;
		case 40:  //down
		    if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
			break;
		default :
			break;
			
	}
})


function moveLeft(){
	//返回值是Boolean类型，判断是否可以向左移动
	if(!canMoveLeft(board)){
		return false;
	}
	for(var i=0;i<4;i++){
		//第一列不移动
		for(var j=1;j<4;j++){
			//当前数字格有值（2，4，一定不是0）
			if(board[i][j] !=0){
//				向左移动的逻辑
				for(var k=0; k<j;k++){
					//1、目标格子的值是0，目标格子与当前格子之间的所有格子值为0
					if (board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)){
						//才能向左移动
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;	
					}else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board)&& !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						hasConflicted[i][k] = true;
						updateScore(score);
					}
						//才能向左移动 					
				}
			}
		}
	}
    setTimeout("updateBoardView()", 200);
    return true;
}
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    //moveRight
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    //moveUp
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlokHorizontalRow(k, i, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(k, i, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    //moveDown
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlokHorizontalRow(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(i, k, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function gameover() {
    alert("gameover!");
    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>" + score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "380px");
    gameover.css("height", "380px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}

///游戏结束的情况,一种是棋盘中没有空的格子,第二种是棋盘格中没有可以移动的格子
function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}
