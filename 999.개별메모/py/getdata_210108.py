#!/usr/bin/python
# -*- coding: utf-8 -*-


import os
import time
import sys
import csv
import statistics
import math

import unicodedata
import platform

csv_file_version = "0.1"

# Declare Variable
starttime = time.time()

home_path = os.getcwd()
print 'home path = ' + home_path + '\n'
os_name = platform.system()

def compile_exit():
	os.chdir(home_path)
	sys.exit()

def run_command(command):
	print command
	e = os.system(command);
#	print e
# 	return e # error 메시지를 리턴, success 인 경우 0

def get_approximate_value(list, target_value):
	print 'get_approximate_value target_value=%f' % (target_value)
	prev_row = 0
	row = 0
	tv = target_value

	for value in list:
		v = value
		if (len(list) - 0) <= row:
			return -1, -1, -1

		if list[row] < 0.0:
			# print 'minus list[row]=%f' % (list[row])
			row = row + 1
			continue

		if v == tv:
			print "get_approximate_value #1 row=%d, list[row]=%f" % (row, list[row])
			return row, list[row]
		elif (tv < list[row]) and (list[prev_row] < tv):
			if abs(list[row] - tv) > abs(list[prev_row] - tv):
				print "get_approximate_value #2 row=%d, list[row]=%f" % (row, list[row])
				return prev_row, list[prev_row]
			else:
				print "get_approximate_value #3 row=%d, list[row]=%f" % (row, list[row])
				return row, list[row]

	prev_row = row
	row = row + 1

	print '!error : get_approximate_value row=%d' % (row)
	return -1, -1

def get_avg_list(list1, list2, list3, row):
	print 'get_avg_list row=%d' % (row)

	a = []
	a.append(len(list1) - 1)
	a.append(len(list2) - 1)
	a.append(len(list3) - 1)
	mini = min(a)
	print 'mini=%d' % (mini)
	if row > mini:
		row = mini

	print 'row=%d' % (row)

	tmp_list = []
	tmp_list.append(list1[row])
	tmp_list.append(list2[row])
	tmp_list.append(list3[row])
	avg = statistics.median(tmp_list)
	if (list1[row] == avg): return 1
	elif (list2[row] == avg): return 2
	elif (list3[row] == avg): return 3
	else: return 0

def load_csv_to_list(file_path):
	print("load_csv_to_list:" + file_path)
	ret_list1 = []
	ret_list2 = []
	f = open(file_path, 'r')
	r = csv.reader(f)
	count = 0
	for line in r:
		count = count+1
		if (count < 3): continue # 1,2 row 는 data 가 아니므로 패스한다.
		#print(line)
		# line_list = line.strip().split(',')
		# try:
		# print 'line1=%s' % line[1]
		if line[1].strip() == '' or line[2].strip() == '':
			print 'null, count=%s' % (count)
			continue
		f_cell1 = round(float(line[1]), 3) # mm, 소수점 3째 자리에서 반올림
		# 3. kgf D column =C494*102.04/1000 한 뒤 소숫점 셋째 자리에서 반올림 or 내림 (엑셀 기준)
		# f_cell2 = round(float(line[2]) * 102.04 / 1000, 4) # kgf, 소수점 3째 자리에서 반올림
		f_cell2 = float(line[2]) * 102.04 / 1000 # kgf, 소수점 3째 자리에서 반올림

		# put_line = str(f_cell1) + "," + str(f_cell2)
		# print(put_line)
		# ret_list.append(put_line)

		# ret_list1.append(str(f_cell1)) # mm
		# ret_list2.append(str(f_cell2)) # kgf
		ret_list1.append(f_cell1) # mm
		ret_list2.append(f_cell2) # kgf
		# except (IOError, OSError) as e:
			# pass
	f.close()
	return ret_list1, ret_list2

def get_target_kgf(list1, list2, target_value, start_row):
	print 'get_target_kgf target_value=%f, start_row=%d' % (target_value, start_row)
	prev_row = 0
	# row = 0
	row = start_row
	tv = target_value

	for value in list2:
		v = value

		if (len(list1) - 0) <= row:
			return -1, -1, -1
		if (len(list2) - 0) <= row:
			return -1, -1, -1

		if list2[row] < 0.0: # mm 는 - 값이 없다. 항상 kgf 만 검사한다.
			# print "minus list2[row]=%f" % (list2[row])
			row = row + 1
			continue

		if v == tv:
			print "kgf #1 row=%d, list1[row]=%f, list2[row]=%f" % (row, list1[row], list2[row])
			return row, list1[row], list2[row]
		elif (tv < list2[row]) and (list2[prev_row] < tv):
			if row == start_row:
				print "kgf #2 row=%d, list1[row]=%f, list2[row]=%f" % (row, list1[row], list2[row])
				return row, list1[row], list2[row]
			elif abs(list2[row] - tv) > abs(list2[prev_row] - tv):
				print "kgf #3 row=%d, list1[row]=%f, list2[row]=%f" % (prev_row, list1[prev_row], list2[prev_row])
				return prev_row, list1[prev_row], list2[prev_row]
			else:
				print "kgf #4 row=%d, list1[row]=%f, list2[row]=%f" % (row, list1[row], list2[row])
				return row, list1[row], list2[row]

		prev_row = row
		row = row + 1

	print '!error : get_target_kgf row=%d' % (row)
	return -1, -1, -1

def get_target_mm(list1, list2, target_mm, start_row):
	print 'get_target_mm target_mm=%f, start_row=%d' % (target_mm, start_row)
	prev_row = 0
	# row = 0
	row = start_row
	tv = target_mm

	for value in list1:
		v = value
		# print 'row=%d, v=%f, tv=%f, len(list1)=%d, len(list2)=%d' % (row, v, tv, len(list1), len(list2))

		if (len(list1) - 0) <= row:
			return -1, -1, -1
		if (len(list2) - 0) <= row:
			return -1, -1, -1

		if list2[row] < 0.0: # mm 는 - 값이 없다. 항상 kgf 만 검사한다.
			# print 'minus list1[row]=%f' % (list1[row])
			row = row + 1
			continue

		if v == tv:
			print "mm #1 row=%d, list1[row]=%f, list2[row]=%f" % (row, list1[row], list2[row])
			return row, list1[row], list2[row]
		elif (tv < list1[row]) and (list1[prev_row] < tv):
			if row == start_row:
				print "mm #3 row=%d, list1[row]=%f, list2[row]=%f" % (row, list1[row], list2[row])
				return row, list1[row], list2[row]
			elif abs(list1[row] - tv) > abs(list1[prev_row] - tv):
				print "mm #2 row=%d, list1[row]=%f, list2[row]=%f" % (row, list1[row], list2[row])
				return prev_row, list1[prev_row], list2[prev_row]
			else:
				print "mm #3 row=%d, list1[row]=%f, list2[row]=%f" % (row, list1[row], list2[row])
				return row, list1[row], list2[row]

		prev_row = row
		row = row + 1

	print '!error : get_target_mm row=%d' % (row)
	return -1, -1, -1

def is_zero_in_list(first_row, second_row, third_row, fourth_row, fifth_row):
	# if first_row == -1 or second_row == -1 or third_row == -1 or fourth_row == -1 or fifth_row == -1:
	if first_row == -1 or second_row == -1 or third_row == -1:
		print 'is zero!'
		return True
	else:
		return False

def last_minus_row(list):
	row = len(list) - 1
	for i in range(row, 0, -1):
		# print "i=%d, value=%f" % (i, list[i])
		if list[i] < 0.0:
			print "i=%d, value=%f" % (i, list[i])
			return i+1
	return 0

def convert_kgf(list):
	i = 0
	for value in list:
		# print 'value=%f' % value
		value = round(float(value), 3)
		# print 'value=%f' % value
		list[i] = value
		i = i + 1
	return list

def get_plus_mm(list1, list2, start_row):
	print 'get_plus_mm start_row=%d' % (start_row)
	row = start_row

	for value in list1:
		v = value

		if (len(list1) - 0) <= row:
			return -1, -1, -1
		if (len(list2) - 0) <= row:
			return -1, -1, -1

		if list1[row] <= 0.0: # mm 값도 0보다 작으면 거른다.
			# print 'minus list1[row]=%f' % (list1[row])
			row = row + 1
			continue

		if list2[row] <= 0.0: # kgf 값도 0보다 작으면 거른다.
			# print 'minus list2[row]=%f' % (list2[row])
			row = row + 1
			continue

		return row, list1[row], list2[row]

	print '!error : get_plus_mm row=%d' % (row)
	return -1, -1, -1

def get_plus_target_mm(list1, list2, start_row, target_kgf):
	print 'get_plus_target_mm start_row=%d, target_kgf=%f' % (start_row, target_kgf)
	row = start_row

	for value in list1:
		v = value

		if (len(list1) - 0) <= row:
			return -1, -1, -1
		if (len(list2) - 0) <= row:
			return -1, -1, -1

		if list1[row] <= 0.0: # mm 값도 0보다 작으면 거른다.
			# print 'minus list1[row]=%f' % (list1[row])
			row = row + 1
			continue

		if list2[row] <= 0.0: # kgf 값도 0보다 작으면 거른다.
			# print 'minus list2[row]=%f' % (list2[row])
			row = row + 1
			continue

		if list2[row] < target_kgf:
			row = row + 1
			continue

		return row, list1[row], list2[row]

	print '!error : get_plus_mm row=%d' % (row)
	return -1, -1, -1

def analysis_date(list_1, list_2, awr, wr, direction):
	# value1 : mm, value2 : kgf
	first_row = 0
	first_mm = 0.0
	first_kgf = 0.0
	second_row = 0
	second_mm = 0.0
	second_kgf = 0.0
	third_row = 0
	third_mm = 0.0
	third_kgf = 0.0
	fourth_row = 0
	fourth_mm = 0.0
	fourth_kgf = 0.0
	fifth_row = 0
	fifth_mm = 0.0
	fifth_kgf = 0.0

	# - 값을 모두 버린다.
	# start_row = last_minus_row(list_2)
	start_row = 0 # 특수한 케이스가 발견되어서 위 로직을 비활성화 함
	print 'start_row=%d' % start_row

	# kgf 값을 수식 적용한다.
	# print '#1 sieze = %d' % len(list_2)
	list_2 = convert_kgf(list_2)
	# print '#2 sieze = %d' % len(list_2)

	# 선택된 문서에서 kgf 값이 최초로 0.01 인 값을 찾는다.
	first_row, first_mm, first_kgf = get_target_kgf(list_1, list_2, 0.01, start_row)
	print 'first! kgf value is 0.01, first_row=%d, first_mm=%f, first_kgf=%f' % ( first_row, first_mm, first_kgf )

	# 1. 1mm 이상 늘어난 경우
	if first_mm > 1.0:
		print 'step #1'

		# 첫번째 값에서 0.02 kgf 늘어난 값을 찾는다.
		target_kgf = first_kgf + 0.02
		second_row, second_mm, second_kgf = get_target_kgf(list_1, list_2, target_kgf, start_row)
		spacing_mm = second_mm - first_mm
		print 'second_row=%d, second_mm=%f, second_kgf=%f spacing_mm=%f' % ( second_row, second_mm, second_kgf, spacing_mm )

		target_mm = second_mm + spacing_mm
		third_row, third_mm, third_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
		spacing_kgf = third_kgf - second_kgf
		print 'third_row=%d, third_mm=%f, third_kgf=%f, spacing_kgf=%f' % ( third_row, third_mm, third_kgf, spacing_kgf )

		if spacing_kgf > 0.02:
			print 'third spacing_kgf > 0.02'
			target_mm = third_mm + spacing_mm
			fourth_row, fourth_mm, fourth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
			spacing_kgf = fourth_kgf - third_kgf
			print 'fourth_row=%d, fourth_mm=%f, fourth_kgf=%f, spacing_kgf=%f' % ( fourth_row, fourth_mm, fourth_kgf, spacing_kgf )

			if spacing_kgf > 0.02:
				print 'fourth spacing_kgf > 0.02'
				target_mm = fourth_mm + spacing_mm
				fifth_row, fifth_mm, fifth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
				print 'fifth_row=%d, fifth_mm=%f, fifth_kgf=%f' % ( fifth_row, fifth_mm, fifth_kgf )
			else:
				print 'fourth spacing_kgf <= 0.02'
				target_kgf = third_kgf + 0.02
				fourth_row, fourth_mm, fourth_kgf = get_target_kgf(list_1, list_2, target_kgf, start_row)
				spacing_mm = fourth_mm - third_mm
				print 'fourth_row=%d, fourth_mm=%f, fourth_kgf=%f, spacing_mm=%f' % ( fourth_row, fourth_mm, fourth_kgf, spacing_mm )

				target_mm = fourth_mm + spacing_mm
				fifth_row, fifth_mm, fifth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
				print 'fifth_row=%d, fifth_mm=%f, fifth_kgf=%f' % ( fifth_row, fifth_mm, fifth_kgf )
		else:
			print 'third spacing_kgf <= 0.02'
			target_kgf = second_kgf + 0.02
			third_row, third_mm, third_kgf = get_target_kgf(list_1, list_2, target_kgf, start_row)
			spacing_mm = third_mm - second_mm
			print 'third_row=%d, third_mm=%f, third_kgf=%f, spacing_mm=%f' % ( third_row, third_mm, third_kgf, spacing_mm )

			target_mm = third_mm + spacing_mm
			fourth_row, fourth_mm, fourth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
			spacing_kgf = fourth_kgf - third_kgf
			print 'fourth_row=%d, fourth_mm=%f, fourth_kgf=%f, spacing_kgf=%f' % ( fourth_row, fourth_mm, fourth_kgf, spacing_kgf )

			if spacing_kgf > 0.02:
				print 'fourth spacing_kgf > 0.02'
				target_mm = fourth_mm + spacing_mm
				fifth_row, fifth_mm, fifth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
				print 'fifth_row=%d, fifth_mm=%f, fifth_kgf=%f' % ( fifth_row, fifth_mm, fifth_kgf )
			else:
				print 'fourth spacing_kgf <= 0.02'
				target_kgf = third_kgf + 0.02
				fourth_row, fourth_mm, fourth_kgf = get_target_kgf(list_1, list_2, target_kgf, start_row)
				spacing_mm = fourth_mm - third_mm
				print 'fourth_row=%d, fourth_mm=%f, fourth_kgf=%f, spacing_mm=%f' % ( fourth_row, fourth_mm, fourth_kgf, spacing_mm )

				target_mm = fourth_mm + spacing_mm
				fifth_row, fifth_mm, fifth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
				print 'fifth_row=%d, fifth_mm=%f, fifth_kgf=%f' % ( fifth_row, fifth_mm, fifth_kgf )

		#jack 에게 물어볼 것
		#음수가 끼이지 않은 값이 0.01kgf를 넘은 값만 있을 경우
		#0.01kfg에 가까운 힘을 기준으로 첫번째 길이 값을 사용한다.
	else: # 1.	1mm 이하인 경우
		print 'step #2'

		# 길이가 0 mm인 지점을 제외하고 길이가 0mm를 초과하는 첫행부터 연속해서 5개 데이터를 사용한다.
		start_row = 0
		first_row, first_mm, first_kgf = get_plus_mm(list_1, list_2, start_row)
		print 'first! first_row=%d, first_mm=%f, first_kgf=%f' % ( first_row, first_mm, first_kgf )
		start_row = first_row + 1
		target_kgf = first_kgf + 0.02
		second_row, second_mm, second_kgf = get_plus_target_mm(list_1, list_2, start_row, target_kgf)
		print 'second_row=%d, second_mm=%f, second_kgf=%f' % ( second_row, second_mm, second_kgf )
		start_row = second_row + 1
		target_kgf = second_kgf + 0.02
		third_row, third_mm, third_kgf = get_plus_target_mm(list_1, list_2, start_row, target_kgf)
		print 'third_row=%d, third_mm=%f, third_kgf=%f' % ( third_row, third_mm, third_kgf )
		start_row = third_row + 1
		target_kgf = third_kgf + 0.02
		fourth_row, fourth_mm, fourth_kgf = get_plus_target_mm(list_1, list_2, start_row, target_kgf)
		print 'fourth_row=%d, fourth_mm=%f, fourth_kgf=%f' % ( fourth_row, fourth_mm, fourth_kgf )
		start_row = fourth_row + 1
		target_kgf = fourth_kgf + 0.02
		fifth_row, fifth_mm, fifth_kgf = get_plus_target_mm(list_1, list_2, start_row, target_kgf)
		print 'fifth_row=%d, fifth_mm=%f, fifth_kgf=%f' % ( fifth_row, fifth_mm, fifth_kgf )

		# else
		# 그런 경우는 첫번째 값의 길이와 힘을 찾고 그 다음 4개의 데이터는 길이에 +0.1mm, 힘에 + 1g을 차례로 합니다.
		# 예를 들어 첫번째 값이  0.1mm, 0.5kgf이고 그 다음행들을 찾지 못했다면 두번째 값부터 다섯번째 값은
		# 두번째 값: 0.1mm + 0.1mm, 0.5kgf + 0.001kgf
		# 세번째 값: 0.1mm + 0.1mm + 0.1mm, 0.5kfg + 0.001kgf + 0.001kgf
		# 네번째 값: 0.1mm + 0.1mm + 0.1mm + 0.1mm, 0.5kfg + 0.001kgf + 0 .001kgf + 0.001kgf
		# 다섯번째 값: 0.1mm + 0.1mm + 0.1mm + 0.1mm + 0.1mm, 0.5kfg + 0.001kgf +0 .001kgf + 0.001kgf + 0.001kgf



		"""
		# 선택된 문서에서 mm 값이 최초로 1 인 값을 찾는다.
		first_row, first_mm, first_kgf = get_target_mm(list_1, list_2, 1, start_row)
		print 'first kgf value is 0.01, first_row=%d, first_mm=%f, first_kgf=%f' % ( first_row, first_mm, first_kgf )

		# 첫번째 mm 에서 1 을 더한 값을 찾는다.
		target_second_mm = first_mm + 1
		second_row, second_mm, second_kgf = get_target_mm(list_1, list_2, target_second_mm, start_row)
		spacing_kgf = second_kgf - first_kgf
		print 'target_second_mm=%f' % (target_second_mm)
		print 'second_row=%d, second_mm=%f, second_kgf=%f' % ( second_row, second_mm, second_kgf )
		print 'spacing_kgf=%f' % (spacing_kgf)

		if spacing_kgf > 0.02: # kgf 차이가 0.02 보다 크면 1mm 씩 5번째까지 측정한다.
			print 'second spacing_kgf > 0.02'
			target_mm = second_mm + 1
			third_row, third_mm, third_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
			target_mm = target_mm + 1
			fourth_row, fourth_mm, fourth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
			target_mm = target_mm + 1
			fifth_row, fifth_mm, fifth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
		else: # kgf 차이가 0.02 보다 작으면 0.02kgf 의 row 를 찾은 후 첫번째와 두번째 mm차이만큼 5번째까지 측정한다.
			print 'second spacing_kgf <= 0.02'
			# 첫번째 값에서 0.02 kgf 늘어난 값을 찾는다.
			target_kgf = first_kgf + 0.02
			second_row, second_mm, second_kgf = get_target_kgf(list_1, list_2, target_kgf, start_row)
			spacing_mm = second_mm - first_mm
			print 'second_row=%d, second_mm=%f, second_kgf=%f spacing_mm=%f' % ( second_row, second_mm, second_kgf, spacing_mm )

			target_mm = second_mm + spacing_mm
			third_row, third_mm, third_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
			spacing_kgf = third_kgf - second_kgf
			print 'third_row=%d, third_mm=%f, third_kgf=%f, spacing_kgf=%f' % ( third_row, third_mm, third_kgf, spacing_kgf )

			if spacing_kgf > 0.02:
				print 'third spacing_kgf > 0.02'
				target_mm = third_mm + spacing_mm
				fourth_row, fourth_mm, fourth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
				spacing_kgf = fourth_kgf - third_kgf
				print 'fourth_row=%d, fourth_mm=%f, fourth_kgf=%f, spacing_kgf=%f' % ( fourth_row, fourth_mm, fourth_kgf, spacing_kgf )

				if spacing_kgf > 0.02:
					print 'fourth spacing_kgf > 0.02'
					target_mm = fourth_mm + spacing_mm
					fifth_row, fifth_mm, fifth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
					print 'fifth_row=%d, fifth_mm=%f, fifth_kgf=%f' % ( fifth_row, fifth_mm, fifth_kgf )
				else:
					print 'fourth spacing_kgf <= 0.02'
					target_kgf = third_kgf + 0.02
					fourth_row, fourth_mm, fourth_kgf = get_target_kgf(list_1, list_2, target_kgf, start_row)
					spacing_mm = fourth_mm - third_mm
					print 'fourth_row=%d, fourth_mm=%f, fourth_kgf=%f, spacing_mm=%f' % ( fourth_row, fourth_mm, fourth_kgf, spacing_mm )

					target_mm = fourth_mm + spacing_mm
					fifth_row, fifth_mm, fifth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
					print 'fifth_row=%d, fifth_mm=%f, fifth_kgf=%f' % ( fifth_row, fifth_mm, fifth_kgf )
			else:
				print 'third spacing_kgf <= 0.02'
				target_kgf = second_kgf + 0.02
				third_row, third_mm, third_kgf = get_target_kgf(list_1, list_2, target_kgf, start_row)
				spacing_mm = third_mm - second_mm
				print 'third_row=%d, third_mm=%f, third_kgf=%f, spacing_mm=%f' % ( third_row, third_mm, third_kgf, spacing_mm )

				target_mm = third_mm + spacing_mm
				fourth_row, fourth_mm, fourth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
				spacing_kgf = fourth_kgf - third_kgf
				print 'fourth_row=%d, fourth_mm=%f, fourth_kgf=%f, spacing_kgf=%f' % ( fourth_row, fourth_mm, fourth_kgf, spacing_kgf )

				if spacing_kgf > 0.02:
					print 'fourth spacing_kgf > 0.02'
					target_mm = fourth_mm + spacing_mm
					fifth_row, fifth_mm, fifth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
					print 'fifth_row=%d, fifth_mm=%f, fifth_kgf=%f' % ( fifth_row, fifth_mm, fifth_kgf )
				else:
					print 'fourth spacing_kgf <= 0.02'
					target_kgf = third_kgf + 0.02
					fourth_row, fourth_mm, fourth_kgf = get_target_kgf(list_1, list_2, target_kgf, start_row)
					spacing_mm = fourth_mm - third_mm
					print 'fourth_row=%d, fourth_mm=%f, fourth_kgf=%f, spacing_mm=%f' % ( fourth_row, fourth_mm, fourth_kgf, spacing_mm )

					target_mm = fourth_mm + spacing_mm
					fifth_row, fifth_mm, fifth_kgf = get_target_mm(list_1, list_2, target_mm, start_row)
					print 'fifth_row=%d, fifth_mm=%f, fifth_kgf=%f' % ( fifth_row, fifth_mm, fifth_kgf )
		"""

	# -1 값이 있다면, 위 조건으로도 만족하지 못한 경우라면... 아마도 측정값이 일정 개수 미만인 경우
	"""
	if is_zero_in_list(first_row, second_row, third_row, fourth_row, fifth_row):
		print 'step #final'
		first_row, first_mm, first_kgf = get_target_kgf(list_1, list_2, 0.05, start_row)
		second_row, second_mm, second_kgf = get_target_kgf(list_1, list_2, 0.1, start_row)
		third_row, third_mm, third_kgf = get_target_kgf(list_1, list_2, 0.2, start_row)
		fourth_row, fourth_mm, fourth_kgf = get_target_kgf(list_1, list_2, 0.4, start_row)
		fifth_row, fifth_mm, fifth_kgf = get_target_kgf(list_1, list_2, 0.8, start_row)

		#[힘이 0.010kgf인 지점을 찾았을 때 길이가 1mm를 넘지 않는 경우]
		#길이가 0 mm인 지점을 제외하고 길이가 0mm를 초과하는 첫행부터 연속해서 5개 데이터를 사용한다.
		#단, 앞의 값과 뒤의 값을 비교해서 20g을 초과하지않으면 초과하는 그 다음행의 값을 사용한다.
	"""
	if is_zero_in_list(first_row, second_row, third_row, fourth_row, fifth_row):
		print 'step #final'

		row = 0
		first_row, first_mm, first_kgf = get_plus_mm(list_1, list_2, row)
		print 'first! first_row=%d, first_mm=%f, first_kgf=%f' % ( first_row, first_mm, first_kgf )

		second_row = third_row = fourth_row = fifth_row = first_row
		second_mm = first_mm + 0.1
		second_kgf = first_kgf + 0.001
		third_mm = first_mm + 0.2
		third_kgf = first_kgf + 0.002
		fourth_mm = first_mm + 0.3
		fourth_kgf = first_kgf + 0.003
		fifth_mm = first_mm + 0.4
		fifth_kgf = first_kgf + 0.004

	if direction == 'bias':
		# wr.writerow(["Stretch Length Bias", first_mm, second_mm, third_mm, fourth_mm, fifth_mm])
		# wr.writerow(["Stretch Force Bias", first_kgf, second_kgf, third_kgf, fourth_kgf, fifth_kgf])
		write_row(awr, wr, "Stretch Length Bias(mm)", first_mm, second_mm, third_mm, fourth_mm, fifth_mm)
		write_row(awr, wr, "Stretch Force Bias(Kgf)", first_kgf, second_kgf, third_kgf, fourth_kgf, fifth_kgf)
	elif direction == 'warp':
		# wr.writerow(["Stretch Length Warp", first_mm, second_mm, third_mm, fourth_mm, fifth_mm])
		# wr.writerow(["Stretch Force Warp", first_kgf, second_kgf, third_kgf, fourth_kgf, fifth_kgf])
		write_row(awr, wr, "Stretch Length Warp(mm)", first_mm, second_mm, third_mm, fourth_mm, fifth_mm)
		write_row(awr, wr, "Stretch Force Warp(Kgf)", first_kgf, second_kgf, third_kgf, fourth_kgf, fifth_kgf)
	elif direction == 'weft':
		# wr.writerow(["Stretch Length Weft", first_mm, second_mm, third_mm, fourth_mm, fifth_mm])
		# wr.writerow(["Stretch Force Weft", first_kgf, second_kgf, third_kgf, fourth_kgf, fifth_kgf])
		write_row(awr, wr, "Stretch Length Weft(mm)", first_mm, second_mm, third_mm, fourth_mm, fifth_mm)
		write_row(awr, wr, "Stretch Force Weft(Kgf)", first_kgf, second_kgf, third_kgf, fourth_kgf, fifth_kgf)

	# wr.writerow([first_mm, second_mm, third_mm, fourth_mm, fifth_mm])
	# wr.writerow([first_kgf, second_kgf, third_kgf, fourth_kgf, fifth_kgf])
	print '------ end --------'

def analysis_direction(name1, name2, name3, awr, wr, direction):
	list11, list12 = load_csv_to_list(name1)
	list21, list22 = load_csv_to_list(name2)
	list31, list32 = load_csv_to_list(name3)

	# 첫번째 문서에서 2 kgf 근사지점의 row 를 얻어온다.
	row, kgf = get_approximate_value(list12, 2)
	print 'analysis_direction row=%d, kgf=%f' % ( row, kgf )
	if row == -1:
		# 마지막 row -5 값을 비교한다.
		if len(list12) > 5:
			row = len(list12) - 5
		else:
			print 'unexpected error! %s' % (len(list12))
			return
		# print 'row=%d' % ( row )

	#문서 1 기준에서 row 값을 찾고 세 문서를 비교한 후 kgf 값이 중간인 문서만 남긴다.
	num = get_avg_list(list12, list22, list32, row)
	print 'spreadsheet doc num=%d' % num

	if num == 1:
		analysis_date(list11, list12, awr, wr, direction)
	elif num == 2:
		analysis_date(list21, list22, awr, wr, direction)
	elif num == 3:
		analysis_date(list31, list32, awr, wr, direction)
	else:
		print 'unexpected error! 2'


def get_file_list(path):
	list = []
	try:
		filenames = []
		if os_name == "Darwin":
			filenames = [unicodedata.normalize('NFC', f) for f in os.listdir(u'.')]
		else:
			filenames = os.listdir(path)

		for filename in filenames:
			full_filename = os.path.join(path, filename)
			if os.path.isfile(full_filename):
				# print(full_filename)
				ext = os.path.splitext(full_filename)[-1]
				if ext == '.csv':
					list.append(filename)
		return list
	except (IOError, OSError) as e:
		pass

def get_subfolder_list(path):
	list = []
	try:
		path_list = os.listdir(path)
		for relative_path in path_list:
			full_path = os.path.join(path, relative_path)
			if os.path.isdir(full_path):
				print(relative_path)
				list.append(relative_path)
		return list
	except (IOError, OSError) as e:
		pass

def write_row(awr, wr, c1, c2, c3, c4, c5, c6):
	print c1, c2, c3, c4, c5, c6
	if c6 == -1 and c5 == -1:
		awr.writerow([c1, c2, c3, c4])
		wr.writerow([c1, c2, c3, c4])
	elif c6 == -1:
		awr.writerow([c1, c2, c3, c4, c5])
		wr.writerow([c1, c2, c3, c4, c5])
	else:
		awr.writerow([c1, c2, c3, c4, c5, c6])
		wr.writerow([c1, c2, c3, c4, c5, c6])

path = home_path
print 'path=' + path
current_subfolder_list = get_subfolder_list(path)

if current_subfolder_list == None or len(current_subfolder_list) <= 0:
	print 'no folder.'
else:
	result_file_name = 'zfab_row.csv'
	af = open(result_file_name, 'wb')
	awr = csv.writer(af)

	awr.writerow(["Version", csv_file_version, "", "", "", ""])
	awr.writerow(["", "", "", "", "", ""])

	for path in current_subfolder_list:
		print 'sub:%s' % (path)
		current_path = home_path + "/" + path
		os.chdir(current_path)
		file_list = get_file_list(current_path)

		# name_list = file_list[0].split("-")
		# output_name = name_list[0] + ".csv"
		fabric_name = file_list[3].replace('-warp_1.csv', '')
		print 'fabric_name=%s' % (fabric_name)
		output_name = fabric_name + '.csv'
		print 'output_name=%s' % (output_name)

		# print 'list length=%d' % (len(file_list))
		index = 0
		targetIndex = -1
		for file_name in file_list:
			# print 'filename:%s' % (file_name)
			if file_name == output_name:
				targetIndex = index
				break
			index = index + 1
		if targetIndex > -1:
			file_list.pop(targetIndex)
		print 'list length=%d' % (len(file_list))
		for file_name in file_list:
			print 'laod filename:%s' % (file_name)

		#f = open(output_name, 'w')
		f = open(output_name, 'wb')
		#f = open(output_name, 'w', newline='') #python3
		wr = csv.writer(f)

		"""
		wr.writerow(["Fabric Name", output_name, "", "", "", ""])
		wr.writerow(["Type", "", "", "", "", ""])
		wr.writerow(["Size", "", "", "", "", ""])
		wr.writerow(["Thickness", "", "", "", "", ""])
		wr.writerow(["Mass", "", "", "", "", ""])
		wr.writerow(["Contact Distance Weft", "", "", "", "", ""])
		wr.writerow(["Moving Distance Weft", "", "", "", "", ""])
		wr.writerow(["Contact Distance Warp", "", "", "", "", ""])
		wr.writerow(["Moving Distance Warp", "", "", "", "", ""])
		"""

		write_row(awr, wr, "Fabric Name", fabric_name, "", "", "", "")
		write_row(awr, wr, "Type", "", "", "", "", "")
		write_row(awr, wr, "Size(mm)", "", "", "", "", "")
		write_row(awr, wr, "Thickness(mm)", "", "", "", "", "")
		write_row(awr, wr, "Mass(g)", "", "", "", "", "")
		write_row(awr, wr, "Contact Distance Weft(mm)", "", "", "", "", "")
		write_row(awr, wr, "Moving Distance Weft(mm)", "", "", "", "", "")
		write_row(awr, wr, "Contact Distance Warp(mm)", "", "", "", "", "")
		write_row(awr, wr, "Moving Distance Warp(mm)", "", "", "", "", "")
                write_row(awr, wr, "Contact Distance Bias(mm)", "", "", "", "", "")
		write_row(awr, wr, "Moving Distance Bias(mm)", "", "", "", "", "")


		# -weft_7~9.csv 로 끝나는 파일들 세개를 묶는다.
		name1 = current_path + '/' + file_list[6]
		name2 = current_path + '/' + file_list[7]
		name3 = current_path + '/' + file_list[8]
		analysis_direction(name1, name2, name3, awr, wr, 'weft')

		# -warp_4~6.csv 로 끝나는 파일들 세개를 묶는다.
		name1 = current_path + '/' + file_list[3]
		name2 = current_path + '/' + file_list[4]
		name3 = current_path + '/' + file_list[5]
		analysis_direction(name1, name2, name3, awr, wr, 'warp')

		# -vias_1~3.csv 로 끝나는 파일들 세개를 묶는다.
		name1 = current_path + '/' + file_list[0]
		name2 = current_path + '/' + file_list[1]
		name3 = current_path + '/' + file_list[2]
		analysis_direction(name1, name2, name3, awr, wr, 'bias')

		f.close()
		awr.writerow(["", "", "", "", "", ""])
	af.close()

compile_exit()

# f = open('output.csv', 'w')
# wr = csv.writer(f)
# wr.writerow([1, "김정수", False])

# 1. 서브 폴더 이름을 리스트로 읽어 온다.
# 현재의 파일명은 서브폴더명으로 지정한다.
# 82181002104521-(A)HAM 0260.is_tens_RawData
# prePath = "./82181002104521-(A)HAM 0260.is_tens_RawData/"

# 2. 서브 폴더 안에 있는 총 9개의 파일이 존재한다.
# 이 파일들은 vias, warp, weft 세가지 측정 방식으로 분류되어 있다.
# 일단 세 쌍으로 읽어들인다.

# (A)HAM 0260-vias_1.csv
# (A)HAM 0260-vias_2.csv
# (A)HAM 0260-vias_3.csv

# (A)HAM 0260-warp_1.csv
# (A)HAM 0260-warp_2.csv
# (A)HAM 0260-warp_3.csv

# (A)HAM 0260-weft_1.csv
# (A)HAM 0260-weft_2.csv
# (A)HAM 0260-weft_3.csv

# name1 = prePath + "(A)HAM 0260-vias_1.csv"
# name2 = prePath + "(A)HAM 0260-vias_2.csv"
# name3 = prePath + "(A)HAM 0260-vias_3.csv"
# analysis_direction(name1, name2, name3, wr)

# name1 = prePath + "(A)HAM 0260-warp_1.csv"
# name2 = prePath + "(A)HAM 0260-warp_2.csv"
# name3 = prePath + "(A)HAM 0260-warp_3.csv"
# analysis_direction(name1, name2, name3, wr)

# name1 = prePath + "(A)HAM 0260-weft_1.csv"
# name2 = prePath + "(A)HAM 0260-weft_2.csv"
# name3 = prePath + "(A)HAM 0260-weft_3.csv"
# analysis_direction(name1, name2, name3, wr)



#wr.writerow([first_mm, second_mm, third_mm, fourth_mm, fifth_mm])
#wr.writerow([first_kgf, second_kgf, third_kgf, fourth_kgf, fifth_kgf])
# f.close()



endtime = time.time()
print '\nStart time: ' + time.ctime(starttime)
print 'End time: ' + time.ctime(endtime)
minute = (endtime - starttime)/60
second = (endtime - starttime)%60
print 'Elapsed time : %dm:%ds' % ( minute, second )

compile_exit()
