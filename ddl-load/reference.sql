-- Values for tbl_ref_cartstatus
TRUNCATE TABLE tbl_ref_cartstatus;

INSERT INTO `tbl_ref_cartstatus` (`CODE`, `NAME`, `STATUS`) VALUES('1', 'Ordered', 0);
INSERT INTO `tbl_ref_cartstatus` (`CODE`, `NAME`, `STATUS`) VALUES('2', 'Transit', 0);
INSERT INTO `tbl_ref_cartstatus` (`CODE`, `NAME`, `STATUS`) VALUES('3', 'Delivered', 0);
INSERT INTO `tbl_ref_cartstatus` (`CODE`, `NAME`, `STATUS`) VALUES('4', 'Pending', 0);
INSERT INTO `tbl_ref_cartstatus` (`CODE`, `NAME`, `STATUS`) VALUES('5', 'Returned', 0);

-- Values for tbl_ref_car_model