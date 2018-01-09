function getPosTop(i, j){
	return 20 + i*90;
}
function getPosLeft(i ,j){
	return 20 + j*90;
}
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
        return "#eee4da";
        break;
        case 4:
        return "#ede0c8";
        break;
        case 8:
        return "#f2b179";
        break;
        case 16:
        return "#f59563";
        break;
        case 32:
        return "#f67c5f";
        break;
        case 64:
        return "#f65e3b";
        break;
        case 128:
        return "#edcf72";
        break;
        case 256:
        return "#edcc61";
        break;
        case 512:
        return "#9c0";
        break;
        case 1024:
        return "#33b5e5";
        break;
        case 2048:
        return "#09c";
        break;
        case 4096:
        return "#a6c";
        break;
        case 8192:
        return "#93c";
        break;
    }
}

//设置数字的背景色
function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65"
    }
    return "white";
}

//在生成随机数字时，可以使用nospace()方法来判断棋盘格中还有没有空的格子
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}
function nomove(board) {
	if (canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || 
	canMoveUp(board)) {
	    return false;
    }
	    return true;
}
function canMoveLeft(board){
	for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
        	//当前的值不必须是非0才能移动
            if (board[i][j] != 0) {
            	//当前格子左边的格子不为0或者是值相等
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                	return true; 
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlokHorizontalCol(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}
function noBlokHorizontalRow(row1, row2, col, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}


