@echo off
REM Exit on error
IF ERRORLEVEL 1 EXIT /B 1

REM Install dependencies
pip install -r requirements.txt

REM Collect static files
python manage.py collectstatic --no-input

REM Apply migrations
python manage.py migrate
