<?php

	#
	# index.php
	#
	
	$page = $_REQUEST['page'];
	
	if( !isset( $page )){
		header( "Location: touch.html" );
		exit;
	}
	
	include ( "includes/header.php" );
	include ( "includes/pagetop.php");
	
	include ( "pages/". $page . ".php" );
	
	include ( "includes/pagebottom.php" );
	include ( "includes/footer.php" );
?> 